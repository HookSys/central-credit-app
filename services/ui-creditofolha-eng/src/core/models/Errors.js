import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import { List, Record, Map } from 'immutable'
import FieldError from 'core/models/FieldError'

const defaultValues = {
  code: null,
  critical: false,
  error: {},
  errors: toEntityList([], FieldError),
  alerts: new List(),
  invalidIds: new List(),
  sentry: null,
  body: {},
  formName: null,
  formRegisteredFields: new Map(),
}

export default class Errors extends BaseRecord(defaultValues, Errors) {
  constructor(values) {
    super({
      ...values,
    })
  }

  throw({ code, critical, error, sentry, body }) {
    const nastedObjects = this.getNastedObjectPath(body)
    const errors = this.toFieldError(error, nastedObjects)
    const alerts = this.getAlertErrors(errors)
    const invalidIds = this.getInvalidIds(errors)
    const { formRegisteredFields } = defaultValues

    return this.merge({
      code,
      critical,
      error,
      errors,
      sentry,
      invalidIds,
      alerts,
      body,
      formRegisteredFields,
    })
  }

  updateFormFieldErrors(fieldName, formName) {
    const errors = this.get('errors')
    const form = this.get('formName')
    const newErrors = errors.filter((error) => {
      if (formName === form && error.path === 'detail') {
        return false
      }
      return error.path !== fieldName || form !== formName
    })
    return this.set('errors', newErrors)
  }

  getFieldError(fieldName, isDetailError = false) {
    const errors = this.get('errors')
    const body = this.get('body')

    if (!errors || errors.size < 1) {
      return null
    }

    const field = (isDetailError && body && body[fieldName]) ? 'detail' : fieldName
    const errorObject = errors.find((err) => err.get('path') === field)
    if (!errorObject) {
      return null
    }

    const error = errorObject.get('error')

    const { name: constructorName } = error.constructor
    if (constructorName === 'List') {
      return error.get(0)
    }
    return error
  }

  getInvalidIds(errors) {
    if (errors.size < 1) {
      return new List()
    }

    return errors.reduce((result, fieldError) => {
      const formId = fieldError.get('formId')
      if (formId && !result.includes(formId)) {
        return result.push(formId)
      }
      return result
    }, new List())
  }

  getAlertErrors(errors) {
    if (errors.size < 1) {
      return new List()
    }

    return errors.reduce((result, error) => {
      const { objectError, nonFieldError, error: errorField } = error
      const { name: constructorName } = errorField.constructor

      if (!objectError && !nonFieldError) {
        return result
      }

      if (constructorName === 'List') {
        const combinedLists = result.toSet().union(errorField.toSet()).toList()
        return combinedLists
      }

      if (constructorName === 'Map' && error.get('non_field_errors')) {
        return result.push(error.get('non_field_errors'))
      }

      return result.push(errorField)
    }, new List())
  }

  hasError() {
    return this.get('code') !== null
  }

  hasNotCriticalError() {
    return this.hasError() && !this.get('critical')
  }

  hasCriticalError() {
    return this.hasError() && this.get('critical')
  }

  getNastedObjectPath(data, fatherName = '') {
    if (!(data && data.keySeq)) {
      return new List()
    }

    return data.keySeq().reduce((result, key) => {
      const keyValue = data.getIn([key])

      if (!keyValue) {
        return result
      }

      const { name } = keyValue.constructor

      if (name === 'List' || name === 'Array') {
        return result.push(`${ fatherName }${ key }`)
      }
      if (keyValue instanceof Record || keyValue instanceof Map) {
        const childrenPaths = this.getNastedObjectPath(new Map(keyValue), `${ fatherName }${ key }.`)
        const combinedArrays = result
          .push(`${ fatherName }${ key }`)
          .toSet()
          .union(childrenPaths.toSet())
          .toList()
        return combinedArrays
      }
      return result
    }, new List())
  }

  toFieldError(data, objectsPaths = [], fatherName = '') {
    if (!data) {
      return []
    }
    return Object.keys(data).reduce((result, key) => {
      if (!data[key]) {
        return result
      }
      const { name } = data[key].constructor
      const path = `${ fatherName }${ key }`

      if (name === 'Array' && data[key].length > 0 && data[key][0].constructor.name === 'Object') {
        const arrayErrors = data[key].reduce((arrayResult, obj, index) => {
          const childrenErrors = this.toFieldError(obj, objectsPaths, `${ fatherName }${ key }[${ index }].`)
          if (childrenErrors.size > 0) {
            return arrayResult.toSet().union(childrenErrors.toSet()).toList()
          }
          return arrayResult
        }, new List())

        return result.toSet().union(arrayErrors.toSet()).toList()
      }

      if (name === 'Object') {
        const childrenErrors = this.toFieldError(data[key], objectsPaths, `${ path }.`)
        const combinedArrays = result.toSet().union(childrenErrors.toSet()).toList()
        return combinedArrays
      }
      const { formRegisteredFields } = this
      const formId = formRegisteredFields ? formRegisteredFields.getIn([path, 'id']) : null

      return result.push(new FieldError({
        path,
        error: data[key],
        nonFieldError: key === 'non_field_errors',
        objectError: objectsPaths.includes(path),
        formId,
      }))
    }, new List())
  }
}

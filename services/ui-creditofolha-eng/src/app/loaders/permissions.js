// @flow
import validators from 'app/permissions'
import type { TLoader, TPermissionsLoader, TPermissionsValidator } from 'app/types'

function Permissions(): TLoader<TPermissionsLoader> {
  const validate = (validations: Array<string>): void => {
    if (!validations || validations.length === 0) {
      return
    }
    const [validation, ...newValidations] = validations
    const validator: TPermissionsValidator = validators[validation].call(this)
    if (validator.validate()) {
      validator.action()
    } else {
      validate(newValidations)
    }
  }

  return {
    load: async () => {
      return {
        validate,
      }
    },
  }
}

export default Permissions

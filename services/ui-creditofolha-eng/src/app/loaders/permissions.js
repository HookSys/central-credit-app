// @flow
import validators from 'app/permissions'
import type { Loader, Permissions, Permission } from 'app/types'

function permissions(): Loader<Permissions> {
  const validate = (validations: Array<string>): void => {
    if (!validations || validations.length === 0) {
      return
    }
    const [validation, ...newValidations] = validations
    const validator: Permission = validators[validation].call(this)
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

export default permissions

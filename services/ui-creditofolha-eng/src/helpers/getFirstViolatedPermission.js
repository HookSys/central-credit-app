const recursiveFinder = (validations = [], permissions) => {
  if (validations.length === 0) {
    return false
  }
  const [validation, ...newValidations] = validations
  const action = permissions[validation.type]()
  if (typeof action === 'function') {
    return () => action(validation.params)
  }

  return recursiveFinder(newValidations, permissions)
}

export default recursiveFinder

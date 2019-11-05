export default (queryParams = null) => {
  if (!queryParams || Object.keys(queryParams).length === 0) {
    return ''
  }

  return Object.keys(queryParams).reduce((result, key) => {
    if (!queryParams[key]) {
      return result
    }
    if (!result) {
      return `?${ key }=${ queryParams[key] }`
    }

    return `${ result }&${ key }=${ queryParams[key] }`
  }, '')
}

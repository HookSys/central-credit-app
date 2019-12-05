export const cpfNormalizer = (value) => {
  if (value) {
    const onlyNums = value.replace(/[^\d]/g, '')

    if (onlyNums.length <= 3) {
      return onlyNums
    }
    if (onlyNums.length <= 6) {
      return `${ onlyNums.slice(0, 3) }.${ onlyNums.slice(3, 6) }`
    }
    if (onlyNums.length <= 9) {
      return `${ onlyNums.slice(0, 3) }.${ onlyNums.slice(3, 6) }.${ onlyNums.slice(6, 9) }`
    }

    return `${ onlyNums.slice(0, 3) }.${ onlyNums.slice(3, 6) }.${ onlyNums.slice(6, 9) }-${ onlyNums.slice(9, 11) }`
  }
  return value
}

export const cnpjNormalizer = (value) => {
  if (value) {
    const onlyNums = value.replace(/[^\d]/g, '')

    if (onlyNums.length <= 2) {
      return onlyNums
    }
    if (onlyNums.length <= 5) {
      return `${ onlyNums.slice(0, 2) }.${ onlyNums.slice(2, 5) }`
    }
    if (onlyNums.length <= 8) {
      return `${ onlyNums.slice(0, 2) }.${ onlyNums.slice(2, 5) }.${ onlyNums.slice(5, 8) }`
    }
    if (onlyNums.length <= 12) {
      return `${ onlyNums.slice(0, 2) }.${ onlyNums.slice(2, 5) }.${ onlyNums.slice(5, 8) }/${ onlyNums.slice(8, 12) }`
    }

    return `${ onlyNums.slice(0, 2) }.${ onlyNums.slice(2, 5) }.${ onlyNums.slice(5, 8) }/${ onlyNums.slice(8, 12) }-${ onlyNums.slice(12, 14) }`
  }
  return value
}

export const phoneNormalizer = (value) => {
  if (value) {
    const onlyNums = value.replace(/[^\d]/g, '')

    if (onlyNums.length <= 2) {
      return `(${ onlyNums }`
    }
    if (onlyNums.length <= 5) {
      return `(${ onlyNums.slice(0, 2) }) ${ onlyNums.slice(2, 5) }`
    }
    if (onlyNums.length <= 8) {
      return `(${ onlyNums.slice(0, 2) }) ${ onlyNums.slice(2, 5) } ${ onlyNums.slice(5, 8) }`
    }

    return `(${ onlyNums.slice(0, 2) }) ${ onlyNums.slice(2, 5) } ${ onlyNums.slice(5, 8) } ${ onlyNums.slice(8, 11) }`
  }
  return value
}

export const toUpperCase = (value) => {
  return typeof value === 'string' ? value.toUpperCase() : value
}

export const cpfOrEmailNormalizer = (value) => {
  if (value) {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(value[0])) {
      return cpfNormalizer(value)
    }
  }
  return value
}

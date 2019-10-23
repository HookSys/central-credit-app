const PERMISSIONS = {
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  NOAUTH_REQUIRED: 'NOAUTH_REQUIRED',
  MODULE_REQUIRED: 'MODULE_REQUIRED',
}

export { PERMISSIONS }

export default Object.keys(PERMISSIONS).reduce((obj, permission) => ({
  ...obj,
  [permission](params) {
    return {
      type: PERMISSIONS[permission],
      params,
    }
  },
}), {})

const PERMISSIONS = {
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  NOAUTH_REQUIRED: 'NOAUTH_REQUIRED',
  MODULE_REQUIRED: 'MODULE_REQUIRED',
  RECENTLY_CREATED: 'RECENTLY_CREATED',
  NO_SELECTED_PROFILE: 'NO_SELECTED_PROFILE',
  SELECTED_PROFILE: 'SELECTED_PROFILE',
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

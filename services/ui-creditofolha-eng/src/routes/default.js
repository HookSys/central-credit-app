// @flow
export const ROUTES = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILES: '/profiles',
  RESET_PASSWORD: '/reset-password',
}

export type DefaultRoutes = $Values<typeof ROUTES>

export const SUBROUTES = {
  REGISTRATION: {
    REGISTER: '/register',
    SUCCESS: '/success',
  },
}

export type DefaultSubRoutes = $Values<typeof SUBROUTES>

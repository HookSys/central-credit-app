// @flow
// Is DEV or Production
export const IsEnvProduction: boolean = process.env.NODE_ENV === 'production'

// Base URL for Helmet
export const BaseUrl: string = 'http://centralcredit.com'

// Endpoint Backend
export const ApiUrl: string | void = 'http://192.168.64.15:31267' //process.env.REACT_APP_CREDITOR_BASE_URL

// Time left to resfresh token, 15 minutes
export const RefreshThreshold: number = 15

// Manifest to get those themes from webpack
export const ThemesManifestName: string = 'themes-manifest.json'

// Sentry Configuration
export const SentryBaseDsn: string | void =
  process.env.REACT_APP_FRONTEND_SENTRY_CREDITOR_BASE_DSN

// Configuration to persist redux reducers in storage
export const PersistConfig = {
  key: 'central-credit-app',
  whitelist: ['auth', 'user']
}

// Minutes to keep cache
export const CacheMinutes = 15

export const ReduxBaseActions: string = '@@centralcredit'

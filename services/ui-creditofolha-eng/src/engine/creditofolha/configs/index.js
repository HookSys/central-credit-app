export default {
  // Base URL for Helmet
  baseUrl: 'http://meu.creditofolha.com',

  // Endpoint Backend
  apiUrl: process.env.REACT_APP_CREDITOR_BASE_URL,

  // Time left to resfresh token, 15 minutes
  refreshThreshold: 15,

  // Manifest to get those themes from webpack
  themesManifestName: 'themes-manifest.json',

  // Sentry Configuration
  sentry_base_dsn: process.env.REACT_APP_FRONTEND_SENTRY_CREDITOR_BASE_DSN,

  // Configuration to persist redux reducers in storage
  persistConfig: {
    key: 'onidata-creditofolha',
    whitelist: ['auth', 'user'],
  },
}

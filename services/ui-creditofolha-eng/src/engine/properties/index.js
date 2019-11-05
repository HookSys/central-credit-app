export default () => ({
  configs: import('./configs'),
  history: import('./history'),
  middlewares: import('./middlewares'),
  sentry: import('./sentry'),
  store: import('./store'),
  service: import('./service'),
  structures: import('./structures'),
  themes: import('./themes'),
  form: import('./form'),
  permissions: import('./permissions'),
})

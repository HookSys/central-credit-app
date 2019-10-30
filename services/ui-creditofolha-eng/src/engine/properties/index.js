export default () => ({
  configs: import('./configs'),
  helpers: import('./helpers'),
  middlewares: import('./middlewares'),
  sentry: import('./sentry'),
  spy: import('./spy'),
  service: import('./service'),
  store: import('./store'),
  structures: import('./structures'),
  themes: import('./themes'),
  form: import('./form'),
  permissions: import('./permissions'),
})
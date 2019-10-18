import * as Sentry from '@sentry/browser'

export default ({ configs }) => {
  Sentry.init({
    dsn: configs.sentry_base_dsn,
  })
}

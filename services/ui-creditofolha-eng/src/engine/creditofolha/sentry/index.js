import * as Sentry from '@sentry/browser'

export default async function () {
  // eslint-disable-next-line camelcase
  const { sentry_base_dsn } = this.configs

  await Sentry.init({
    dsn: sentry_base_dsn,
  })

  return true
}

import { PERMISSIONS } from 'engine/constants/permissions'
import noAuthRequired from './noAuthRequired'
import authRequired from './authRequired'

export default async function () {
  return {
    [PERMISSIONS.NOAUTH_REQUIRED]: noAuthRequired.bind(this),
    [PERMISSIONS.AUTH_REQUIRED]: authRequired.bind(this),
  }
}

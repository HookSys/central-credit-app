import { PERMISSIONS } from 'engine/constants/permissions'
import noAuthRequired from './noAuthRequired'
import authRequired from './authRequired'
import wasRecentlyCreated from './wasRecentlyCreated'
import noSelectedProfile from './noSelectedProfile'
import selectedProfile from './selectedProfile'

export default async function () {
  return {
    [PERMISSIONS.NOAUTH_REQUIRED]: noAuthRequired.bind(this),
    [PERMISSIONS.AUTH_REQUIRED]: authRequired.bind(this),
    [PERMISSIONS.RECENTLY_CREATED]: wasRecentlyCreated.bind(this),
    [PERMISSIONS.NO_SELECTED_PROFILE]: noSelectedProfile.bind(this),
    [PERMISSIONS.SELECTED_PROFILE]: selectedProfile.bind(this),
  }
}

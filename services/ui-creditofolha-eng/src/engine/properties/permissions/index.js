import { PERMISSIONS } from 'engine/constants/permissions'
import noAuthRequired from './noAuthRequired'
import authRequired from './authRequired'
import wasRecentlyCreated from './wasRecentlyCreated'
import noSelectedProfile from './noSelectedProfile'
import selectedProfile from './selectedProfile'
import useTermsAccepted from './useTermsAccepted'
import noUseTermsAccepted from './noUseTermsAccepted'

export default async function () {
  return {
    [PERMISSIONS.NOAUTH_REQUIRED]: noAuthRequired.bind(this),
    [PERMISSIONS.AUTH_REQUIRED]: authRequired.bind(this),
    [PERMISSIONS.RECENTLY_CREATED]: wasRecentlyCreated.bind(this),
    [PERMISSIONS.NO_SELECTED_PROFILE]: noSelectedProfile.bind(this),
    [PERMISSIONS.SELECTED_PROFILE]: selectedProfile.bind(this),
    [PERMISSIONS.USE_TERMS_ACCEPTED]: useTermsAccepted.bind(this),
    [PERMISSIONS.NO_USE_TERMS_ACCEPTED]: noUseTermsAccepted.bind(this),
  }
}

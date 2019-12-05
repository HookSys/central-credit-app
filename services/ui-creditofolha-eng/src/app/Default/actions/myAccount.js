import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const MY_ACCOUNT_EMAIL_SEND_TOKEN_SUCCESS = 'MY_ACCOUNT_EMAIL_SEND_TOKEN_SUCCESS'
export const MY_ACCOUNT_EMAIL_VERIFY_TOKEN_SUCCESS = 'MY_ACCOUNT_EMAIL_VERIFY_TOKEN_SUCCESS'

function myAccountEmailSendTokenSuccess(payload) {
  return {
    type: MY_ACCOUNT_EMAIL_SEND_TOKEN_SUCCESS,
    payload,
  }
}

function myAccountEmailVerifyTokenSuccess(payload) {
  return {
    type: MY_ACCOUNT_EMAIL_VERIFY_TOKEN_SUCCESS,
    payload,
  }
}

export function myAccountEmailSendToken(email) {
  return async (dispatch, state, services) => {
    dispatch(appLoadSpinner())

    try {
      const response = await services.apiV2({
        path: 'auth/email-verify-token/',
        method: 'POST',
        body: {
          email,
        },
      })

      await dispatch(myAccountEmailSendTokenSuccess(response))
      return response
    } catch (error) {
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function myAccountEmailVerifyToken(token) {
  return async (dispatch, state, services) => {
    dispatch(appLoadSpinner())

    try {
      const response = await services.apiV2({
        path: 'auth/email-verify-confirm/',
        method: 'POST',
        body: {
          token,
        },
      })

      await dispatch(myAccountEmailVerifyTokenSuccess(response))
      return response
    } catch (error) {
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'
import { CONTENT_TYPE } from 'constants/service'

export const RELATO_GENERATE_SUCCESS = 'CORE/RELATO_GENERATE_SUCCESS'
export const RELATO_UPLOAD_SUCCESS = 'CORE/RELATO_UPLOAD_SUCCESS'
export const RELATO_FAIL = 'CORE/RELATO_UPLOAD_FAIL'

function relatoGenerateSuccess(payload) {
  return {
    type: RELATO_GENERATE_SUCCESS,
    payload
  }
}

function relatoUploadSuccess(payload) {
  return {
    type: RELATO_GENERATE_SUCCESS,
    payload
  }
}

function relatoFail(errorMessage) {
  return {
    type: RELATO_FAIL,
    errorMessage
  }
}

export function relatoGenerateRequest(database, onlyPayments) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/generateAll',
        method: 'POST',
        force: true,
        body: {
          database,
          onlyPayments
        }
      })

      await dispatch(relatoGenerateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(relatoFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}


export function relatoUploadRequest(code, fileContent) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/upload/:code',
        method: 'POST',
        force: true,
        cType: CONTENT_TYPE.TEXT,
        pathParams: {
          code
        },
        body: fileContent
      })

      await dispatch(relatoUploadSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(relatoFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

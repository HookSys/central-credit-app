import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const PROPOSALS_ASYNC_SUCCESS = 'EMPLOYEE/PROPOSALS_ASYNC_SUCCESS'
export const PROPOSALS_ASYNC_FAIL = 'EMPLOYEE/PROPOSALS_ASYNC_FAIL'

function proposalsAsyncSuccess(proposals) {
  return {
    type: PROPOSALS_ASYNC_SUCCESS,
    payload: proposals,
  }
}

function proposalsAsyncFail(error) {
  return {
    type: PROPOSALS_ASYNC_FAIL,
    payload: error,
  }
}

export function proposalsAsyncRequest() {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const user = getState().user.get('data')
    const entity = user.getSelectedEntity()

    try {
      const response = await service.apiV2({
        path: '/me/funcionarios/:entity/credito/propostas/',
        method: 'GET',
        pathParams: {
          entity: entity.get('entidade_id'),
        },
        body: null,
      })

      await dispatch(proposalsAsyncSuccess(response))
      return response.results
    } catch (errorMessage) {
      dispatch(proposalsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

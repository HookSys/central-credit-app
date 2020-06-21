import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const USERS_ASYNC_SUCCESS = 'ADMIN/USERS_ASYNC_SUCCESS'
export const USER_ASYNC_SUCCESS = 'ADMIN/USER_ASYNC_SUCCESS'
export const USER_RESET_SELECTED = 'ADMIN/USER_RESET_SELECTED'
export const USERS_ASYNC_FAIL = 'ADMIN/USERS_ASYNC_FAIL'
export const USERS_UPDATE_PAGE = 'ADMIN/USERS_UPDATE_PAGE'
export const USERS_UPDATE_FILTERS = 'ADMIN/USERS_UPDATE_FILTERS'
export const USER_CREATE_SUCCESS = 'ADMIN/USER_CREATE_SUCCESS'
export const USER_DELETE_SUCCESS = 'ADMIN/USER_DELETE_SUCCESS'
export const USER_COMPANY_CHANGE_SELECTED = 'ADMIN/USER_COMPANY_CHANGE_SELECTED'

function usersAsyncSuccess(users) {
  return {
    type: USERS_ASYNC_SUCCESS,
    payload: users
  }
}

function userAsyncSuccess(user) {
  return {
    type: USER_ASYNC_SUCCESS,
    payload: user
  }
}

function usersAsyncFail(error) {
  return {
    type: USERS_ASYNC_FAIL,
    payload: error
  }
}

function userCreateSuccess(user) {
  return {
    type: USER_CREATE_SUCCESS,
    payload: user
  }
}

function userDeleteSuccess() {
  return {
    type: USER_DELETE_SUCCESS
  }
}

export function userResetSelected() {
  return {
    type: USER_RESET_SELECTED
  }
}

export function usersUpdatePage(page) {
  return {
    type: USERS_UPDATE_PAGE,
    payload: page
  }
}

export function usersUpdateFilters(search) {
  return {
    type: USERS_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function userCompanyChangeSelected(company, isSelected) {
  return {
    type: USER_COMPANY_CHANGE_SELECTED,
    payload: {
      company,
      isSelected
    }
  }
}

export function usersAsyncRequest(force = true) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { users } = getState().admin
    const options = users.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await service.api({
        path: '/users',
        method: 'GET',
        force,
        queryParams: {
          limit: options.get('limit'),
          offset
        }
      })

      await dispatch(usersAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(usersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userAsyncRequest(userId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/users/:userId',
        method: 'GET',
        force: true,
        pathParams: {
          userId
        }
      })

      await dispatch(userAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(usersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userCreateRequest(user) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/users',
        method: 'POST',
        body: user
      })

      await dispatch(userCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(usersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userEditRequest(userId, user) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/users/:userId',
        method: 'PATCH',
        pathParams: {
          userId
        },
        body: user
      })

      await dispatch(userCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(usersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userDeleteRequest(userId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      await service.api({
        path: '/users/:userId',
        method: 'DELETE',
        pathParams: {
          userId
        }
      })

      await dispatch(userDeleteSuccess())
      await dispatch(userResetSelected())
      return true
    } catch (errorMessage) {
      dispatch(usersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

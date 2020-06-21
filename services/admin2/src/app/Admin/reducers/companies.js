import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import Company from 'models/Company'

import {
  COMPANIES_ASYNC_SUCCESS,
  COMPANY_ASYNC_SUCCESS,
  COMPANIES_ASYNC_FAIL,
  COMPANIES_UPDATE_PAGE,
  COMPANY_RESET_SELECTED
} from 'admin/actions/companies'

const CompaniesOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null
})

const CompaniesFilters = new Record({
  search: null
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Company),
  options: CompaniesOptions(),
  filters: CompaniesFilters()
})

const actionsMap = {
  [COMPANY_ASYNC_SUCCESS]: (state, action) => {
    const { payload: company } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new Company(company))
    })
  },
  [COMPANIES_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, Company)
    })
  },
  [COMPANY_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', null)
    })
  },
  [COMPANIES_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  },
  [COMPANIES_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page)
    })
  }
}

export default function companies(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}

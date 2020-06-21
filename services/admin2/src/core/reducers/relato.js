/* eslint-disable camelcase */
import BaseList, { toEntityList } from 'base/BaseList'
import { Record } from 'immutable'

import {
  RELATO_GENERATE_SUCCESS,
  RELATO_UPLOAD_SUCCESS,
  RELATO_FAIL
} from 'core/actions/relato'

const initialState = new BaseList({
  errorMessage: '',
  results: toEntityList([], Record)
})

const actionsMap = {
  [RELATO_GENERATE_SUCCESS]: (state, action) => {
    console.log(action)
    return state
  },
  [RELATO_UPLOAD_SUCCESS]: (state, action) => {
    console.log(action)
    return state
  },
  [RELATO_FAIL]: (state, action) => {
    console.log(action)
    return state
  }
}

export default function relato(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}

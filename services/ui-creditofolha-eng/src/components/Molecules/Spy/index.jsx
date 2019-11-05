import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

// variable which will point to react-router history
let globalHistory = null
let globalDispatch = null
let globalAccess = {}

const Spy = () => {
  const access = useSelector((state) => state.auth.get('access'))
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    globalHistory = history
    globalDispatch = dispatch
    globalAccess = {
      access,
    }
  }, [history, dispatch, access])

  return null
}

export default Spy

// export react-router history
export function getHistory() {
  return globalHistory
}

export function getDispatch() {
  return globalDispatch
}

export function getAccess() {
  return globalAccess
}

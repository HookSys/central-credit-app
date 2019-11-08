import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// variable which will point to react-router history
let globalHistory = null
let globalDispatch = null
let globalAccess = {}

const Spy = () => {
  const access = useSelector((state) => state.auth.get('access'))
  const userFunction = useSelector((state) => {
    const entity = state.user.get('data').getSelectedEntity()
    return !entity ? null : entity.get('identificador')
  })
  const dispatch = useDispatch()
  const history = useHistory()

  globalHistory = history
  globalDispatch = dispatch
  globalAccess = {
    access,
    userFunction,
  }

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

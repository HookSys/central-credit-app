import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// variable which will point to react-router history
let globalHistory = null
let globalDispatch = null
let globalAccess = {}
let globalHasNotCriticalError = false

// component which we will mount on top of the app
@connect(
  state => ({
    access: state.auth.get('access'),
    hasNotCriticalError: state.errors.hasNotCriticalError(),
    selectedFinancial: state.user.get('data').get('selectedFinancial'),
  })
)
class Spy extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    hasNotCriticalError: PropTypes.bool.isRequired,
    access: PropTypes.string,
    selectedFinancial: PropTypes.object.isRequired,
  }

  static defaultProps = {
    access: null,
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { history, dispatch, access, selectedFinancial, hasNotCriticalError } = nextProps
    const { userFunction } = selectedFinancial
    globalHistory = history
    globalDispatch = dispatch
    globalHasNotCriticalError = hasNotCriticalError
    globalAccess = {
      access,
      userFunction,
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { history, dispatch, access, selectedFinancial, hasNotCriticalError } = this.props
    const { userFunction } = selectedFinancial
    globalHistory = history
    globalDispatch = dispatch
    globalHasNotCriticalError = hasNotCriticalError
    globalAccess = {
      access,
      userFunction,
    }
  }

  render() {
    return null
  }
}

export const GlobalHistory = withRouter(Spy)

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

export function getHasNotCriticalError() {
  return globalHasNotCriticalError
}

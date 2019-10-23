import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// variable which will point to react-router history
let globalHistory = null
let globalDispatch = null
let globalAccess = {}

// component which we will mount on top of the app
@connect(
  state => ({
    access: state.auth.get('access'),
  })
)
class Spy extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    access: PropTypes.string,
  }

  static defaultProps = {
    access: null,
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { history, dispatch, access } = nextProps
    globalHistory = history
    globalDispatch = dispatch
    globalAccess = {
      access,
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { history, dispatch, access } = this.props
    globalHistory = history
    globalDispatch = dispatch
    globalAccess = {
      access,
    }
  }

  render() {
    return null
  }
}

export default withRouter(Spy)

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

import React, { Fragment, useEffect } from 'react'
import { ConnectedRouter } from 'connected-react-router/immutable'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Spinner from 'components/Spinner'

const App = ({ history, entity }) => {
  const isLoading = useSelector(state => state.app.get('spinner'))

  useEffect(() => {
    moment.locale('pt-br')
  }, [])

  return (
    <ConnectedRouter history={ history }>
      <Fragment>
        { isLoading && <Spinner /> }
        { entity.render() }
      </Fragment>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
}

export default App

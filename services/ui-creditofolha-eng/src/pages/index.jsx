import React, { Fragment, useEffect } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Spinner from 'components/Spinner'
import SwitchTransition from 'components/SwitchTransition'

const Pages = ({ history, entity }) => {
  const isLoading = useSelector(state => state.app.get('spinner'))

  useEffect(() => {
    moment.locale('pt-br')
  }, [])

  return (
    <ConnectedRouter history={ history }>
      <Fragment>
        { isLoading && <Spinner /> }
        <SwitchTransition>
          { entity.render() }
        </SwitchTransition>
      </Fragment>
    </ConnectedRouter>
  )
}

Pages.propTypes = {
  history: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
}

export default Pages

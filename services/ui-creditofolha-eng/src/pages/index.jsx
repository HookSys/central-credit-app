import React, { Fragment, useEffect } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { StructureBuilder, Spinner, SwitchTransition } from 'components'
import { useEngine } from 'engine'

const Pages = ({ history }) => {
  const isLoading = useSelector(state => state.app.get('spinner'))
  const structures = useEngine((engine) => engine.structures)
  const { MODULES } = structures

  useEffect(() => {
    moment.locale('pt-br')
  }, [])

  return (
    <ConnectedRouter history={ history }>
      <Fragment>
        { isLoading && <Spinner /> }
        <SwitchTransition>
          { StructureBuilder(structures[MODULES.EMPLOYEE]) }
          { StructureBuilder(structures[MODULES.COMPANY]) }
          { StructureBuilder(structures[MODULES.DEFAULT]) }
        </SwitchTransition>
      </Fragment>
    </ConnectedRouter>
  )
}

Pages.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Pages

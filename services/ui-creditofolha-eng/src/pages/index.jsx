import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { StructureBuilder, Spy, Spinner, SwitchTransition } from 'components'
import { useEngine } from 'engine'

const Pages = () => {
  const isLoading = useSelector(state => state.app.get('spinner'))
  const structures = useEngine((engine) => engine.structures)
  const { MODULES } = structures
  
  useEffect(() => {
    moment.locale('pt-br')
  }, [])

  return (
    <Router>
      <Fragment>
        <Spy />
        { isLoading && <Spinner /> }
        <SwitchTransition>
          { StructureBuilder(structures[MODULES.EMPLOYEE]) }
          { StructureBuilder(structures[MODULES.COMPANY]) }
          { StructureBuilder(structures[MODULES.DEFAULT]) }
        </SwitchTransition>
      </Fragment>
    </Router>
  )
}

export default Pages

import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { StructureBuilder, Spy, Spinner } from 'components'
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
        <Switch>
          { StructureBuilder(structures[MODULES.EMPLOYEE]) }
          { StructureBuilder(structures[MODULES.COMPANY]) }
          { StructureBuilder(structures[MODULES.DEFAULT]) }
        </Switch>
      </Fragment>
    </Router>
  )
}

export default Pages

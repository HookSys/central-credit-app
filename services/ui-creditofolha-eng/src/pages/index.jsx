import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { StructureBuilder, Spy } from 'components'
import { useEngine } from 'engine'

const Pages = () => {
  const structures = useEngine((engine) => engine.structures)
  const [structure, setStructure] = useState(null)
  
  useEffect(() => {
    const { MODULES } = structures
    setStructure(StructureBuilder(structures[MODULES.DEFAULT]))
    moment.locale('pt-br')
  }, [])

  return (
    <Router>
      <Fragment>
        <Spy />
        <Switch>
          { structure }
        </Switch>
      </Fragment>
    </Router>
  )
}

export default Pages

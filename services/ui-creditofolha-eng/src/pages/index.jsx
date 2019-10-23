import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { StructureBuilder, Spy } from 'components'
import withEngine from 'engine/withEngine'

const Pages = ({ appStructures }) => {
  const [structure, setStructure] = useState(null)
  useEffect(() => {
    const { MODULES } = appStructures
    setStructure(StructureBuilder(appStructures[MODULES.DEFAULT]))
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

Pages.propTypes = {
  appStructures: PropTypes.object.isRequired,
}

export default withEngine(Pages)

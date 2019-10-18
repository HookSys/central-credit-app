import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import moment from 'moment'
import AppEngine from 'engine'
import StructureBuilder from 'components/Atoms/StructureBuilder'

const { structures } = AppEngine
const { MODULES } = structures
const DEFAUL_STRUCTURE = StructureBuilder(structures[MODULES.DEFAULT])

const Pages = () => {
  useEffect(() => {
    moment.locale('pt-br')
  }, [])

  return (
    <Router>
      <Switch>
        { DEFAUL_STRUCTURE }
      </Switch>
    </Router>
  )
}

export default Pages

import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'
import RepassSidePanel from 'company/pages/Repass/SidePanel'

const Repass = ({ children, parent: { routes }, entity: { pages } }) => {
  const onSidePanelChange = useCallback((route) => () => {
    console.log(route)
  }, [])

  return (
    <Fragment>
      <RepassSidePanel
        pages={ pages.REPASS }
        routes={ routes }
        onChange={ onSidePanelChange }
      />
      <Layout>
        { children }
      </Layout>
    </Fragment>
  )
}

Repass.propTypes = {
  children: PropTypes.node.isRequired,
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
}

export default React.memo(Repass)

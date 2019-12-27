import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
// import { useDispatch } from 'react-redux'
import RepassSidePanel from 'company/pages/Repass/SidePanel'

const RepassDiscount = ({ children, parent: { parent }, entity: { pages } }) => {
  // const dispatch = useDispatch()
  const onSidePanelChange = useCallback(() => {
  }, [])

  return (
    <Fragment>
      <RepassSidePanel
        pages={ pages.REPASS }
        routes={ parent.routes }
        onChange={ onSidePanelChange }
      />
      { children }
    </Fragment>
  )
}

RepassDiscount.propTypes = {
  children: PropTypes.node.isRequired,
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
}

export default RepassDiscount

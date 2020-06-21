import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'

import { ColumnWrapper, ColumnRight, Container } from 'templates/PageTemplate'

import Button from 'components/Button'
import FunnelViewSidePanel from './SidePanel'

const FunnelsView = () => {
  return (
    <Fragment>
      <FunnelViewSidePanel />
      <ColumnWrapper className='mt-0 mb-4 d-flex flex-column flex-md-row'>
        <ColumnRight isActionBar={true}>
          <Button type='button' className='btn btn-link'>
            Remover
          </Button>
          <Button type='button' className='btn btn-primary'>
            Editar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true} />
    </Fragment>
  )
}

FunnelsView.propTypes = {
  // profile: PropTypes.object.isRequired
}

export default React.memo(FunnelsView)

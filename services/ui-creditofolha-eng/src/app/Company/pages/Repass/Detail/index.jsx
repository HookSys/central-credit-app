import React, { Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import RepassSidePanel from 'company/pages/Repass/SidePanel'

const RepassDetailList = ({ parent, entity: { pages: entityPages } }) => {
  const onSidePanelChange = useCallback(() => {
  }, [])

  return (
    <Fragment>
      <RepassSidePanel
        pages={ entityPages.REPASS }
        routes={ parent.routes }
        onChange={ onSidePanelChange }
      />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Detalhamento</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container>
        Detalhamento
      </Container>
    </Fragment>
  )
}

RepassDetailList.propTypes = {
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
}

export default RepassDetailList

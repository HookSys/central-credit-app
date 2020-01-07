import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'

const RepassDetailList = () => {
  return (
    <Fragment>
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
}

export default React.memo(RepassDetailList)

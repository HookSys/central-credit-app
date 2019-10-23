import React from 'react'
import PropTypes from 'prop-types'
import { CleanTemplate } from 'components'

const { Content, HeaderTitle } = CleanTemplate

const CompanyRegistration = ({ structure: { ROUTES } }) => {
  return (
    <Content>
      <HeaderTitle linkTo={ ROUTES.REGISTRATION.URL }>
        Cadastro de Empresa
      </HeaderTitle>
        Test
    </Content>
  )
}

CompanyRegistration.propTypes = {
  structure: PropTypes.object.isRequired,
}

export default CompanyRegistration

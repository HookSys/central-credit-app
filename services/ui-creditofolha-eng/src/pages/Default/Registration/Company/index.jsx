import React from 'react'
import PropTypes from 'prop-types'
import { CleanTemplate } from 'components'

const { Content, HeaderTitle } = CleanTemplate

const CompanyRegistration = ({ rootPath }) => {
  return (
    <Content>
      <HeaderTitle linkTo={ rootPath }>
        Cadastro de Empresa
      </HeaderTitle>
        Test
    </Content>
  )
}

CompanyRegistration.propTypes = {
  rootPath: PropTypes.string.isRequired,
}

export default CompanyRegistration

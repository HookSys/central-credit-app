import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CleanTemplate, SvgImage } from 'components'
import { ArrowForward } from '@material-ui/icons'

const { AVAILABLE_IMAGES } = SvgImage
const { Content, HeaderTitle, Banner } = CleanTemplate

const Register = ({ structure: { ROUTES } }) => {
  const { REGISTRATION } = ROUTES
  const { EMPLOYEE, COMPANY } = REGISTRATION.ROUTES
  return (
    <Fragment>
      <Content>
        <HeaderTitle linkTo={ ROUTES.LOGIN.URL }>
          Cadastre-se
        </HeaderTitle>
        <div className='action-items'>
          <Link to={ `${ REGISTRATION.URL }${ EMPLOYEE.URL }` }>
            Sou funcionário e quero um empréstimo
            <ArrowForward />
          </Link>
          <Link to={ `${ REGISTRATION.URL }${ COMPANY.URL }` }>
            Sou o gestor dos contratos realizados
            <ArrowForward />
          </Link>
          <a target='_blank' rel='noopener noreferrer' href='http://materiais.creditofolha.com/cadastro-de-empresas'>
            Quero que minha empresa faça parte
            <ArrowForward />
          </a>
        </div>
      </Content>
      <Banner>
        <SvgImage icon={ AVAILABLE_IMAGES.REGISTRATION_BANNER } maxWidth='900px' maxHeight='363px' />
      </Banner>
    </Fragment>
  )
}

Register.propTypes = {
  structure: PropTypes.object.isRequired,
}

export default Register
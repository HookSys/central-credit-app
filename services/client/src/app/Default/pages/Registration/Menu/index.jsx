// @flow
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SvgImage from 'components/SvgImage'
import { ArrowForward } from '@material-ui/icons'

import CleanTemplate from 'templates/CleanTemplate'

import type { TRegistrationPageProps } from 'default/types'

const { AVAILABLE_IMAGES } = SvgImage
const { Content, HeaderTitle, Banner } = CleanTemplate

const MenuRegistration = (
  { entity: { pages } }: TRegistrationPageProps
) => {
  return (
    <Fragment>
      <Content>
        <HeaderTitle linkTo={ pages.LOGIN }>
          Cadastre-se
        </HeaderTitle>
        <div className='action-items'>
          <Link to={ pages.REGISTRATION.REGISTER }>
            Sou funcionário e quero um empréstimo
            <ArrowForward />
          </Link>
          <Link to={ pages.REGISTRATION.REGISTER }>
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
        <SvgImage icon={ AVAILABLE_IMAGES.REGISTRATION_BANNER } maxWidth='540px' maxHeight='218px' />
      </Banner>
    </Fragment>
  )
}

MenuRegistration.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default MenuRegistration

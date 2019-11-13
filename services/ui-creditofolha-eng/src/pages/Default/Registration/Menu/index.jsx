// @flow
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { SvgImage } from 'components'
import { ArrowForward } from '@material-ui/icons'

import { CleanTemplate } from 'templates'

import type { Entity } from 'app/types'

const { AVAILABLE_IMAGES } = SvgImage
const { Content, HeaderTitle, Banner } = CleanTemplate

type Props = {
  entity: Entity,
}

const MenuRegistration = ({ entity: { pages } }: Props) => {
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

export default MenuRegistration

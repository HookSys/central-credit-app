/* eslint-disable no-restricted-syntax */
// @flow
import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import SvgImage from 'components/SvgImage'
import { CleanTemplate } from 'templates'
import Alert from 'components/Alert'
import Button from 'components/Button'

import type { TResetPasswordProps as TMainResetPasswordProps } from 'default/types'

const { AVAILABLE_IMAGES } = SvgImage
const { Layout, Container, HeaderLogo } = CleanTemplate

type TResetPasswordProps = {
  ...TMainResetPasswordProps,
  children: any,
}
const ResetPassword = ({ children, entity: { pages } }: TResetPasswordProps) => {
  const alertRef = useRef()
  const history = useHistory()
  return (
    <Layout className='reset-password'>
      <Alert ref={ alertRef } className='alert warning'>
        <div className='d-flex flex-column'>
          <p className='pr-4'>
            <strong>Ops!</strong> Essa é 3 vezes que você tenta o envio: <br />
            - Confira se o CPF ou Email foram digitados corretamente. <br />
            - Caso tenha digitado corretamente, tente um novo cadastro. <br />
            - Se o problema persistir fale conosco. <br />
          </p>
          <Button
            className='btn btn-light btn-sm bg-white ml-auto'
            onClick={ () => history.push(pages.REGISTRATION.INDEX) }
          >
            Novo cadastro
          </Button>
        </div>
      </Alert>
      <Container size='col-12 col-md-5'>
        <HeaderLogo>
          <SvgImage icon={ AVAILABLE_IMAGES.LOGO_WHITE_FULL } maxWidth='155px' maxHeight='40px' />
        </HeaderLogo>
        { children }
      </Container>
    </Layout>
  )
}

export default ResetPassword

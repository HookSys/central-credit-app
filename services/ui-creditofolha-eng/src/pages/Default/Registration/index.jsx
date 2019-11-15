/* eslint-disable no-restricted-syntax */
// @flow
import React from 'react'
import { SvgImage } from 'components'
import { CleanTemplate } from 'templates'

import type { TDefaultRoutes } from 'app/entities/default/routes'

const { AVAILABLE_IMAGES } = SvgImage
const { Layout, Container, HeaderLogo } = CleanTemplate

type TRegistrationProps = {
  children: any,
}
const Registration = ({ children }: TRegistrationProps) => {
  return (
    <Layout className='registration'>
      <Container size='col-12 col-md-5'>
        <HeaderLogo>
          <SvgImage icon={ AVAILABLE_IMAGES.LOGO_WHITE_FULL } maxWidth='155px' maxHeight='40px' />
        </HeaderLogo>
        { children }
      </Container>
    </Layout>
  )
}

export type TRegistrationModel = $ElementType<TDefaultRoutes, 'REGISTRATION'>
export default Registration

import React from 'react'
import PropTypes from 'prop-types'
import { CleanTemplate, SvgImage } from 'components'

const { AVAILABLE_IMAGES } = SvgImage
const { Layout, Container, HeaderLogo } = CleanTemplate

const Registration = ({ children }) => {
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

Registration.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Registration

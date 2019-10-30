import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { FeedbackTemplate, SvgImage } from 'components'

const { AVAILABLE_IMAGES } = SvgImage
const { Layout, Header, Content, Links, Link } = FeedbackTemplate

const Feedback = ({ children, structure: { ROUTES } }) => {
  const history = useHistory()
  return (
    <Layout>
      <Header
        desktopIconName={ AVAILABLE_IMAGES.REGISTER_FEEDBACK_DESKTOP_LOGO }
        mobileIconName={ AVAILABLE_IMAGES.REGISTER_FEEDBACK_MOBILE_LOGO }
      >
        Falta pouco!
      </Header>
      <Content>
        Enviamos um email de autenticação para
        <strong> dann.c@live.com </strong>,
        somente com o email autenticado você consegue solicitar crédito.
        <Links>
          <Link onClick={ () => history.push(ROUTES.LOGIN.URL) } hasArrow={ true }>
            Voltar para a página inicial
          </Link>
          <Link onClick={ () => history.push(ROUTES.PROFILES.URL) } hasArrow={ true }>
            Quero simular crédito e validar meu email depois
          </Link>
        </Links>
      </Content>
    </Layout>
  )
}

Feedback.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Feedback

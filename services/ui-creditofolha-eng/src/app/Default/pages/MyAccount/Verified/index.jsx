import React from 'react'
import PropTypes from 'prop-types'
import { range } from 'lodash'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout, { ColumnWrapper, ColumnLeft, Title } from 'templates/PageTemplate'
import VerifiedArea from 'default/components/VerifiedArea'

const MyAccountVerified = ({ entity: { pages } }) => {
  const user = useSelector(state => state.user.get('data'))
  const history = useHistory()

  return (
    <Layout>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Minha Conta</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <VerifiedArea
        label='E-mail'
        isVerified={ user.get('email_verificado') }
        onValidate={ () => {
          history.push(pages.MY_ACCOUNT.EMAIL.INDEX)
        } }
      >
        { user.get('email') }
      </VerifiedArea>
      <VerifiedArea
        label='Contato'
        isVerified={ user.get('telefone_celular_verificado') }
        onValidate={ () => {} }
      >
        { user.getFormatedPhone('telefone_celular') }
      </VerifiedArea>
      <VerifiedArea
        label='Redefinir Senha'
        isVerified={ true }
        hideStatus={ true }
        onValidate={ () => {} }
      >
        <div className='d-flex mt-2 ml-n1'>
          { range(1, 10).map((obj) => <div className='password' key={ obj } />) }
        </div>
      </VerifiedArea>
    </Layout>
  )
}

MyAccountVerified.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default MyAccountVerified

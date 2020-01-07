import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import Button from 'components/Button'
import FeedbackTemplate from 'templates/FeedbackTemplate'

const { Layout, Header, Content } = FeedbackTemplate

const EmployeesDemissionSuccess = ({ entity: { pages } }) => {
  const location = useLocation()
  if (!location.state || typeof location.state.value === 'undefined') {
    return (
      <Redirect to={ pages.EMPLOYEES.DEMISSION.INDEX } />
    )
  }

  const history = useHistory()
  const { state: { value } } = location
  const onBack = useCallback(() => history.push(pages.EMPLOYEES.DEMISSION.INDEX), [])
  return (
    <Layout>
      <Header>
        Demissão realizada!
      </Header>
      <Content>
        <p className='d-block font-size-xl px-3 px-md-0'>
          O valor <strong>{ value }</strong> vai ser inserido no próximo lote de pagamento.
        </p>
        <Button className='btn btn-light bg-white border-gray mt-5 d-block mx-auto' onClick={ onBack }>
          Voltar
        </Button>
      </Content>
    </Layout>
  )
}

EmployeesDemissionSuccess.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default React.memo(EmployeesDemissionSuccess)

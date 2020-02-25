import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import { CheckCircle, HighlightOff } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import Layout, { ColumnWrapper, ColumnLeft, ColumnRight, Title } from 'templates/PageTemplate'
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from 'components/Table'
import Button from 'components/Button'
import { proposalsAsyncRequest } from 'employee/actions/proposals'

const ContractsDashboard = ({ entity: { pages } }) => {
  const history = useHistory()
  const proposals = useSelector(({ employee }) => employee.proposals.get('results'))
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.get('data'))
  const isEmailValidated = user.get('email_verificado')
  const isPhoneValidated = user.get('telefone_celular_verificado')

  if (!isEmailValidated || !isPhoneValidated) {
    return (
      <Redirect to={ pages.INDEX.VALIDATE } />
    )
  }

  useEffect(() => {
    const response = dispatch(proposalsAsyncRequest())
    if (response.length === 0) {
      history.push(pages.INDEX.NO_CONTRACTS)
    }
  }, [])

  return (
    <Layout>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Minhas solicitações</Title>
        </ColumnLeft>
        <ColumnRight>
          <Button onClick={ () => history.push(pages.CREDIT) }>Simular Crédito</Button>
        </ColumnRight>
      </ColumnWrapper>
      <Table>
        <TableHead>
          <TableHeader width='20%'>
            Valor recebido
          </TableHeader>
          <TableHeader width='20%'>
            Parcelas
          </TableHeader>
          <TableHeader>
            Próximo vencimento
          </TableHeader>
          <TableHeader>
            Status
          </TableHeader>
          <TableHeader width='20%' />
        </TableHead>
        <TableBody>
          { proposals.size > 0 && proposals.map((proposal) => {
            return (
              <TableRow>
                <TableCell>
                  <strong>{ proposal.getFormatedCurrency('valor_liberado') }</strong>
                </TableCell>
                <TableCell>
                  { `${ proposal.get('num_parcelas') } x ${ proposal.getFormatedCurrency('valor_recebivel') }`}
                </TableCell>
                <TableCell>
                  { proposal.getNextDue() }
                </TableCell>
                <TableCell>
                  { proposal.getIn(['status', 'status']) }
                </TableCell>
                <TableCell className='text-right'>
                  { proposal.getIn(['status', 'status']) === 'Aprovada' && (
                    <CheckCircle className='text-success' />
                  ) }
                  { proposal.getIn(['status', 'status']) === 'Cancelado' && (
                    <HighlightOff className='text-danger' />
                  ) }
                </TableCell>
              </TableRow>
            )
          }) }
        </TableBody>
      </Table>
    </Layout>
  )
}

ContractsDashboard.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default ContractsDashboard

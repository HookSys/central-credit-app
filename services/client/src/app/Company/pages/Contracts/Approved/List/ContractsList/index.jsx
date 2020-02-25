import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Container } from 'templates/PageTemplate'
import { useSelector } from 'react-redux'
import Cards, { Card, CardRow, CardTitle, CardAlert, CardContent, CardInfo } from 'components/Cards'
import { ContractStatusDescription, ContractStatusColor } from 'constants/contracts'
import { bindPathParams } from 'helpers'

const ContractsApprovedList = ({ pages }) => {
  const contracts = useSelector(({ company }) => company.contracts.get('results'))
  const history = useHistory()

  const onContractClick = useCallback((contract) => () => {
    const route = bindPathParams({
      contractId: contract.get('id'),
    }, pages.CONTRACTS.APPROVED.VIEW)
    setTimeout(() => history.push(route))
  }, [])

  return (
    <Container className='p-3 pt-md-4'>
      <Cards>
        { contracts.map((contract) => {
          const employee = contract.get('funcionario')
          const status = contract.get('status')
          return (
            <Card
              key={ contract.get('id') }
              onClick={ onContractClick(contract) }
            >
              <CardRow>
                <CardTitle isAvatarVisible={ true }>
                  { employee.getFullName() }
                </CardTitle>
                <CardAlert type={ ContractStatusColor[status] }>
                  { ContractStatusDescription[status] }
                </CardAlert>
              </CardRow>
              <CardContent>
                <CardInfo title='Valor financiado'>
                  { contract.getFormatedCurrency('valor_financiado') }
                </CardInfo>
                <CardInfo title='Parcela'>
                  { `${ contract.get('num_parcelas') }x ${ contract.getFormatedCurrency('valor_recebivel') }` }
                </CardInfo>
              </CardContent>
            </Card>
          )
        }) }
      </Cards>
    </Container>
  )
}

ContractsApprovedList.propTypes = {
  pages: PropTypes.object.isRequired,
}

export default React.memo(ContractsApprovedList)

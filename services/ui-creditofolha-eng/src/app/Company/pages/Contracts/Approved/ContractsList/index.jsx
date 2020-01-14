import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import Cards, { Card, CardRow, CardTitle, CardAlert, CardContent, CardInfo } from 'components/Cards'
import { ContractStatusDescription, ContractStatusColor } from 'constants/contracts'

const ContractsApprovedList = () => {
  const contracts = useSelector(({ company }) => company.contracts.get('results'))

  const onContractClick = useCallback(() => () => {
  }, [])

  return (
    <Cards className='mt-2'>
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
  )
}

export default React.memo(ContractsApprovedList)

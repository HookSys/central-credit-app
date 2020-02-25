import React from 'react'
import PropTypes from 'prop-types'
import { TableBody, TableCard, TableCardItem, TableCardInfo, TableBoxInfo } from 'components/Table'
import UserInfo from 'components/UserInfo'

const ContractsPendingListMobile = ({ contracts }) => {
  return (
    <TableBody>
      { contracts.size > 0 && contracts.map((contract) => {
        const contractId = contract.get('id')
        const employee = contract.get('funcionario')
        const fullname = employee.getFullName()
        const compromised = employee.getCompromised()
        const compromisedAfterContract = contract.getCompromisedAfterContract()

        return (
          <TableCard key={ contractId }>
            <TableCardItem>
              <UserInfo
                infoClassName='font-weight-lighter text-low-dark'
                avatarClassName='text-dark border-dark'
                fullName={ fullname }
              >
                { `CPF: ${ employee.get('cpf') }` }
              </UserInfo>
            </TableCardItem>
            <TableCardItem isTableCardInfo={ true }>
              <TableCardInfo size='50'>
                <TableBoxInfo
                  title='Valor da Parcela'
                  className='font-size-sm text-low-dark'
                  valueClassName='d-none'
                />
                <TableBoxInfo
                  title={ contract.getFormatedCurrency('valor_recebivel') }
                  className='d-block'
                  valueClassName='d-block small text-low-dark mt-n1'
                >
                  { `em ${ contract.get('num_parcelas') } vezes` }
                </TableBoxInfo>
              </TableCardInfo>

              <TableCardInfo noBorder={ true }>
                <TableBoxInfo
                  title='Comprometido'
                  className='font-size-sm text-low-dark'
                  valueClassName='d-none'
                />
                <TableBoxInfo
                  title={ contract.getFormatedCurrency(compromised) }
                  className='d-block'
                  valueClassName='d-block small text-low-dark mt-n1'
                >
                  { `${ employee.getCompromisedPercent() } - na solicitação` }
                </TableBoxInfo>
              </TableCardInfo>
            </TableCardItem>
            <TableCardItem>
              <TableCardInfo noBorder={ true }>
                <TableBoxInfo
                  title='Comprometimento após averbação'
                  className='font-size-sm text-low-dark'
                  valueClassName='d-none'
                />
                <TableBoxInfo
                  title={ contract.getFormatedCurrency(compromisedAfterContract) }
                  className='d-block font-weight-bold'
                  valueClassName='d-block small text-low-dark mt-n1'
                >
                  { `${ contract.getCompromisedAfterContractPercent() } - após averbação` }
                </TableBoxInfo>
              </TableCardInfo>
            </TableCardItem>
          </TableCard>
        )
      }) }
    </TableBody>
  )
}

ContractsPendingListMobile.propTypes = {
  contracts: PropTypes.object.isRequired,
}

export default React.memo(ContractsPendingListMobile)

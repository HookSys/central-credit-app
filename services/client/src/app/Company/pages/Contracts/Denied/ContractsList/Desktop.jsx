import React from 'react'
import PropTypes from 'prop-types'
import { ContractTypeDescription } from 'constants/contracts'
import { TableBody, TableRow, TableCell, TableBoxInfo } from 'components/Table'
import Badge from 'components/Badge'
import UserInfo from 'components/UserInfo'

const ContractsPendingListDesktop = ({ contracts }) => {
  return (
    <TableBody>
      { contracts.size > 0 && contracts.map((contract) => {
        const contractId = contract.get('id')
        const employee = contract.get('funcionario')
        const fullname = employee.getFullName()
        const compromised = employee.getCompromised()
        const compromisedAfterContract = contract.getCompromisedAfterContract()

        return (
          <TableRow key={ contractId }>
            <TableCell>
              <Badge>
                { ContractTypeDescription[contract.get('origem')]}
              </Badge>
            </TableCell>
            <TableCell>
              <UserInfo
                infoClassName='font-weight-lighter text-low-dark'
                avatarClassName='text-dark border-dark'
                fullName={ fullname }
              >
                { `CPF: ${ employee.get('cpf') }` }
              </UserInfo>
            </TableCell>
            <TableCell>
              { employee.get('matricula') }
            </TableCell>
            <TableCell>
              <TableBoxInfo title={ contract.getFormatedCurrency('valor_recebivel') }>
                { `em ${ contract.get('num_parcelas') } vezes` }
              </TableBoxInfo>
            </TableCell>
            <TableCell>
              <TableBoxInfo title={ contract.getFormatedCurrency(compromised) }>
                { `${ employee.getCompromisedPercent() } - na solicitação` }
              </TableBoxInfo>
            </TableCell>
            <TableCell>
              <TableBoxInfo title={ contract.getFormatedCurrency(compromisedAfterContract) }>
                { `${ contract.getCompromisedAfterContractPercent() } - após averbação` }
              </TableBoxInfo>
            </TableCell>
          </TableRow>
        )
      }) }
    </TableBody>
  )
}

ContractsPendingListDesktop.propTypes = {
  contracts: PropTypes.object.isRequired,
}

export default React.memo(ContractsPendingListDesktop)

import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { RemoveRedEyeRounded, Block } from '@material-ui/icons'
import { ContractTypeDescription } from 'constants/contracts'
import { TableBody, TableRow, TableCell, TableBoxInfo } from 'components/Table'
import Checkbox from 'components/Checkbox'
import Button from 'components/Button'
import Badge from 'components/Badge'
import UserInfo from 'components/UserInfo'

const ContractsPendingListDesktop = ({ contracts, selected, onDetailsClick, onSelectedChange }) => {
  const currentDate = moment()

  return (
    <TableBody>
      { contracts.size > 0 && contracts.map((contract) => {
        const contractId = contract.get('id')
        const employee = contract.get('funcionario')
        const fullname = employee.getFullName()
        const compromised = employee.getCompromised()
        const compromisedAfterContract = contract.getCompromisedAfterContract()
        const requestDate = contract.getAsMoment('data_solicitacao')
        const isExpired = contract.isExpired()
        const isSelected = selected.findIndex((item) => item.get('id') === contractId) >= 0

        return (
          <TableRow key={ contractId } disabled={ isExpired }>
            <TableCell>
              { !isExpired ? (
                <Checkbox
                  id={ `contract-${ contractId }` }
                  name={ `contract-${ contractId }` }
                  checked={ isSelected }
                  onChange={ onSelectedChange(contract, isSelected) }
                />
              ) : (
                <div>
                  <Block className='text-danger' />
                </div>
              ) }
            </TableCell>
            <TableCell>
              <Badge type={ !isExpired && isSelected ? 'primary' : 'default' }>
                { ContractTypeDescription[contract.get('origem')]}
              </Badge>
            </TableCell>
            <TableCell>
              <UserInfo
                className={ !isExpired && isSelected ? 'text-primary' : '' }
                hideAvatar={ true }
                infoClassName='font-weight-lighter text-low-dark'
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
                { `${ employee.getCompromisedPercent() } - atual` }
              </TableBoxInfo>
            </TableCell>
            <TableCell>
              <TableBoxInfo title={ contract.getFormatedCurrency(compromisedAfterContract) }>
                { `${ contract.getCompromisedAfterContractPercent() } - após averbação` }
              </TableBoxInfo>
            </TableCell>
            <TableCell>
              { !isExpired ? (
                <TableBoxInfo title={ `${ requestDate ? requestDate.diff(currentDate, 'days') : 0 } dias` }>
                  { contract.getFormatedDate('data_solicitacao') }
                </TableBoxInfo>
              ) : (
                <span className='d-block text-danger'>
                  Expirado
                </span>
              ) }
            </TableCell>
            <TableCell>
              <Button className='btn' type='button' onClick={ onDetailsClick(contract) }>
                <RemoveRedEyeRounded />
              </Button>
            </TableCell>
          </TableRow>
        )
      }) }
    </TableBody>
  )
}

ContractsPendingListDesktop.propTypes = {
  contracts: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
  onSelectedChange: PropTypes.func.isRequired,
}

export default React.memo(ContractsPendingListDesktop)

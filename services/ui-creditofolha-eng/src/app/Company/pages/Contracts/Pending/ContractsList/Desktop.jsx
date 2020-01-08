import React, { Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { RemoveRedEyeRounded, Block } from '@material-ui/icons'
import { ContractTypeDescription } from 'constants/contracts'
import { TableBody, TableRow, TableCell } from 'components/Table'
import Input from 'components/Input'
import Button from 'components/Button'

const ContractsPendingListDesktop = ({ contracts, selected, onDetailsClick, onSelectedChange }) => {
  const currentDate = moment()

  return (
    <TableBody>
      { contracts.size > 0 && contracts.map((contract) => {
        const contractId = contract.get('id')
        const employee = contract.get('funcionario')
        const fullname = employee.getFullName()
        const compromised = employee.getCompromised()
        const requestDate = contract.getAsMoment('data_solicitacao')
        const isExpired = contract.isExpired()
        const isSelected = selected.findIndex((item) => item.get('id') === contractId) >= 0

        return (
          <TableRow key={ contractId } disabled={ isExpired }>
            <TableCell>
              { !isExpired ? (
                <div className='form-check'>
                  <Input
                    type='checkbox'
                    checked={ isSelected }
                    id={ `contract-${ contractId }` }
                    name={ `contract-${ contractId }` }
                    onChange={ onSelectedChange(contract, isSelected) }
                    className='form-check-input position-static'
                  />
                </div>
              ) : (
                <div>
                  <Block className='text-danger' />
                </div>
              ) }
            </TableCell>
            <TableCell>
              <span
                className={ classNames('p-2 border font-weight-bold rounded text-uppercase text-truncate', {
                  'border-dark text-dark': !isSelected,
                  'border-primary text-primary': !isExpired && isSelected,
                }) }
              >
                { ContractTypeDescription[contract.get('origem')]}
              </span>
            </TableCell>
            <TableCell>
              <div className='d-flex align-items-center'>
                <div className='d-flex flex-column justify-content-center ml-2'>
                  <span
                    className={ classNames('d-block mb-n1 text-truncate', {
                      'text-primary': !isExpired && isSelected,
                    }) }
                  >
                    { fullname }
                  </span>
                  <span className='d-block font-size-sm font-weight-lighter text-low-dark'>{ `CPF: ${ employee.get('cpf') }` }</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              { employee.get('matricula') }
            </TableCell>
            <TableCell>
              <span className='d-block'>
                { contract.getFormatedCurrency('valor_recebivel') }
              </span>
              <span className='d-block small text-low-dark mn-t-3'>
                { `em ${ contract.get('num_parcelas') } vezes` }
              </span>
            </TableCell>
            <TableCell>
              <span className='d-block'>
                { contract.getFormatedCurrency(compromised) }
              </span>
              <span className='d-block small text-low-dark mn-t-3'>
                { `${ employee.getCompromisedPercent() } - atual` }
              </span>
            </TableCell>
            <TableCell className='text-center'>
              { contract.getCompromisedAfterContractPercent() }
            </TableCell>
            <TableCell>
              { !isExpired ? (
                <Fragment>
                  <span className='d-block'>
                    { `${ requestDate ? requestDate.diff(currentDate, 'days') : 0 } dias` }
                  </span>
                  <span className='d-block small text-low-dark mn-t-3'>
                    { contract.getFormatedDate('data_solicitacao') }
                  </span>
                </Fragment>
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

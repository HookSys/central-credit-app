import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Block } from '@material-ui/icons'
import { TableBody, TableCard, TableCardItem } from 'components/Table'
import Input from 'components/Input'
import Avatar from 'components/Avatar'
import Button from 'components/Button'

const ContractsPendingListMobile = ({ contracts, selected, onDetailsClick, onSelectedChange }) => {
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
          <TableCard
            key={ contractId }
            disabled={ isExpired }
          >
            <TableCardItem onClick={ onSelectedChange(contract, isSelected) }>
              <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center w-90'>
                  { !isExpired ? (
                    <div className='w-10 w-xm-auto mr-sm-3'>
                      <div className='form-check pl-3'>
                        <Input
                          type='checkbox'
                          checked={ isSelected }
                          id={ `contract-${ contractId }` }
                          name={ `contract-${ contractId }` }
                          onChange={ onSelectedChange(contract, isSelected) }
                          className='form-check-input position-static'
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='w-10 w-xm-auto mr-sm-3'>
                      <Block className='text-danger ml-n2 ml-xm-0' />
                    </div>
                  ) }

                  <div className='d-flex align-items-center w-80 w-xm-85'>
                    <div className='d-none d-xm-flex w-25 w-sm-auto mr-sm-2 justify-content-center'>
                      <Avatar
                        title={ fullname }
                        className={ classNames({
                          'text-primary border-primary': !isExpired && isSelected,
                          'text-danger border-danger': isExpired,
                          'text-dark border-dark': !isExpired && !isSelected,
                        }) }
                      />
                    </div>
                    <div className='w-90 w-xm-75'>
                      <div
                        className={ classNames('mt-1 text-truncate', {
                          'text-primary': !isExpired && isSelected,
                          'text-danger': isExpired,
                          'text-dark': !isExpired && !isSelected,
                        }) }
                      >
                        { fullname }
                      </div>
                      <div className='font-size-sm font-weight-lighter mt-n1 text-low-dark text-truncate'>{ `CPF: ${ employee.get('cpf') }` }</div>
                    </div>
                  </div>
                </div>
                <div className='ml-auto text-right'>
                  { !isExpired ? (
                    <span className='d-block'>
                      { `${ requestDate ? requestDate.diff(currentDate, 'days') : 0 } dias` }
                    </span>
                  ) : (
                    <span className='d-block text-danger'>
                      Expirado
                    </span>
                  ) }
                </div>
              </div>
            </TableCardItem>
            <TableCardItem className='d-flex justify-content-between'>
              <div className='border-right border-gray w-50'>
                <span className='font-size-sm text-low-dark'>Valor da Parcela</span>
                <span className='d-block'>
                  { contract.getFormatedCurrency('valor_recebivel') }
                </span>
                <span className='d-block small text-low-dark mt-n1'>
                  { `em ${ contract.get('num_parcelas') } vezes` }
                </span>
              </div>
              <div>
                <span className='font-size-sm text-low-dark'>Comprometido</span>
                <span className='d-block'>{ contract.getFormatedCurrency(compromised) }</span>
                <span className='d-block small text-low-dark mt-n1'>
                  { `${ employee.getCompromisedPercent() } - atual` }
                </span>
              </div>
            </TableCardItem>
            <TableCardItem>
              <span className='font-size-sm text-low-dark'>Comprometimento após averbação</span>
              <span className='d-block'>
                <strong>{ contract.getFormatedCurrency(compromisedAfterContract) }</strong>
              </span>
              <span className='d-block small text-low-dark mt-n1'>
                { `${ contract.getCompromisedAfterContractPercent() } - após averbação` }
              </span>
            </TableCardItem>
            <TableCardItem noBorder={ true }>
              <Button className='btn btn-link w-100' onClick={ onDetailsClick(contract) }>
                Ver detalhes
              </Button>
            </TableCardItem>
          </TableCard>
        )
      }) }
    </TableBody>
  )
}

ContractsPendingListMobile.propTypes = {
  contracts: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
  onSelectedChange: PropTypes.func.isRequired,
}

export default React.memo(ContractsPendingListMobile)

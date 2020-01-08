import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Block } from '@material-ui/icons'
import { TableBody, TableCard, TableCardItem, TableCardInfo, TableBoxInfo } from 'components/Table'
import Checkbox from 'components/Checkbox'
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
                    <div className='w-15 w-xm-10 w-sm-auto mr-sm-5'>
                      <Checkbox
                        id={ `contract-${ contractId }` }
                        name={ `contract-${ contractId }` }
                        checked={ isSelected }
                        onChange={ onSelectedChange(contract, isSelected) }
                      />
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
                  { `${ employee.getCompromisedPercent() } - atual` }
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

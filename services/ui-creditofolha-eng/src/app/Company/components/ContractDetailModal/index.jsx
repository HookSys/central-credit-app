import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody } from 'components/Modal'
import { HeaderInfo } from 'templates/PageTemplate'
import Badge from 'components/Badge'
import { ContractTypeDescription } from 'constants/contracts'
import { ArrowDownward, ArrowForward } from '@material-ui/icons'

const ContractDetailModal = memo(({ isOpen, onClose, contract }) => {
  if (!contract) {
    return null
  }

  const employee = contract.get('funcionario')
  const clientInfo = contract.get('cliente_info_no_contrato')
  const compromised = employee.getCompromised()
  const newCompromised = contract.getCompromisedAfterContract()
  const newLiquidSalary = contract.getLiquidSalaryAfterContract()
  return (
    <Modal isOpen={ isOpen } toggle={ onClose } centered={ true } size='md'>
      <ModalHeader toggle={ onClose }>
        <Badge>
          { ContractTypeDescription[contract.get('origem')]}
        </Badge>
        <span className='d-block d-md-inline-block pt-3 pl-md-4'>{ employee.getFullName() }</span>
      </ModalHeader>
      <ModalBody>
        <div className='d-flex flex-column flex-md-row justify-content-md-center px-3 mt-md-3 mb-4'>
          <div className='w-100 w-md-40 pr-md-3'>
            <span className='d-block font-size-md font-weight-bold mb-2 mb-md-4 text-center text-md-left'>Antes da averbação</span>
            <HeaderInfo className='font-size-sm px-2 border-bottom border-gray mb-3' title='Salário líquido'>
              <span className='font-size-lg mt-n1 mb-2'>{ clientInfo.getFormatedCurrency('salario_liquido') }</span>
            </HeaderInfo>
            <HeaderInfo className='font-size-sm px-2 border-bottom border-gray mb-3' title='Comprometimento'>
              <span className='font-size-lg mt-n1 mb-2'>{ employee.getFormatedCurrency(compromised) }</span>
            </HeaderInfo>
            <HeaderInfo className='font-size-sm px-2 border-bottom border-gray mb-3' title='Emp. em bancos'>
              <span className='font-size-lg mt-n1 mb-2'>{ employee.getFormatedCurrency('valor_emprestado_outros_bancos') }</span>
            </HeaderInfo>
          </div>
          <div className='d-flex w-100 w-md-20 align-items-center justify-content-center'>
            <ArrowForward className='d-none d-md-block w-60 h-60' />
            <ArrowDownward className='d-md-none w-30 h-30' />
          </div>
          <div className='w-100 w-md-40 pl-md-3 mt-4 mt-md-0'>
            <span className='d-block font-size-md font-weight-bold mb-2 mb-md-4 text-center text-md-left'>Depois da averbação</span>
            <HeaderInfo className='font-size-sm px-2 border-bottom border-gray mb-3' title='Salário líquido'>
              <span className='font-size-lg mt-n1 mb-2'>{ employee.getFormatedCurrency(newLiquidSalary) }</span>
            </HeaderInfo>
            <HeaderInfo className='font-size-sm px-2 border-bottom border-gray mb-3' title='Comprometimento'>
              <span className='font-size-lg mt-n1 mb-2'>{ employee.getFormatedCurrency(newCompromised) }</span>
            </HeaderInfo>
            <HeaderInfo className='font-size-sm px-2 border-bottom border-gray mb-3' title='Emp. em bancos'>
              <span className='font-size-lg mt-n1 mb-2'>{ employee.getFormatedCurrency('valor_emprestado_outros_bancos') }</span>
            </HeaderInfo>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
})

ContractDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contract: PropTypes.object,
}

ContractDetailModal.defaultProps = {
  contract: null,
}

export default ContractDetailModal

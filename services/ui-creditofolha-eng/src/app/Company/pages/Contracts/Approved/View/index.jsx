/* eslint-disable no-nested-ternary */
import React, { Fragment, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { ColumnWrapper, ColumnLeft, Container, HeaderInfo } from 'templates/PageTemplate'
import ViewTable, { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { ToastContext } from 'components/ToastProvider'
import { viewApprovedQuery, approvedAverbationQuery } from 'company/queries/contracts'
import { approvedContractReceivableQuery } from 'company/queries/receivables'
import { contractsAsyncRequest, contractAsyncRequest, contractResetSelected } from 'company/actions/contracts'
import { receivablesAsyncRequest, receivablesResetResults } from 'company/actions/receivables'
import { CONTRACT_TAB_STATUS } from 'company/pages/Contracts/Approved/List'

import ContractViewSidePanel from './SidePanel'

const getContractTabStatusByStatus = (status) => {
  const activeTab = Object.keys(CONTRACT_TAB_STATUS)
    .filter(tab => CONTRACT_TAB_STATUS[tab].includes(status))
  return activeTab ? CONTRACT_TAB_STATUS[activeTab] : CONTRACT_TAB_STATUS.all
}

const ContractView = ({ entity: { pages } }) => {
  const { showErrorToast } = useContext(ToastContext)
  const { contractId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const contract = useSelector(({ company }) => company.contracts.getIn(['options', 'selected']))
  const contracts = useSelector(({ company }) => company.contracts.get('results'))
  const receivables = useSelector(({ company }) => company.receivables.get('results'))
  const options = useSelector(({ company }) => company.receivables.get('options'))

  const employeeNotFound = () => {
    showErrorToast({
      message: 'Contrato não encontrado!',
    })
    history.push(pages.CONTRACTS.INDEX)
  }

  useEffect(() => () => {
    dispatch(contractResetSelected())
    dispatch(receivablesResetResults())
  }, [])

  useEffect(() => {
    if (!contractId) {
      employeeNotFound()
    } else {
      dispatch(contractAsyncRequest(viewApprovedQuery, contractId)).then((response) => {
        if (!response) {
          employeeNotFound()
          return
        }
        if (contracts.size === 0) {
          dispatch(contractsAsyncRequest(approvedAverbationQuery, {
            status_averbacao: 'averbado',
            status: getContractTabStatusByStatus(response.get('status')),
            ordering: '-data_solicitacao',
          }))
        }
        dispatch(receivablesAsyncRequest(approvedContractReceivableQuery, contractId))
      })
    }
  }, [contractId])

  if (!contract) {
    return null
  }

  return (
    <Fragment>
      <ContractViewSidePanel />
      <ColumnWrapper>
        <ColumnLeft>
          <div className='d-flex justify-content-between justify-content-md-end flex-wrap'>
            <HeaderInfo
              title='Valor emprestado'
              className='mt-3 mt-md-0 pr-2'
            >
              { contract.getFormatedCurrency('valor_financiado') }
            </HeaderInfo>
            <HeaderInfo
              title='Primeira parcela'
              className='mt-3 mt-md-0 ml-md-4 pr-2'
            >
              { contract.getFormatedDate('primeiro_vencimento') }
            </HeaderInfo>
            <HeaderInfo
              title='Data de Admissão'
              className='mt-3 mt-md-0 ml-md-4 pr-2'
            >
              { contract.getFormatedDate('ultimo_vencimento') }
            </HeaderInfo>
          </div>
        </ColumnLeft>
      </ColumnWrapper>
      <Container isWhiteBackground={ true }>
        <ViewTable title='Detalhes'>
          <ViewTableRow>
            <ViewTableCell noBorderLeft={ true } className='w-md-33' label='Parcela' value={ contract.getFormatedCurrency('valor_recebivel') } />
            <ViewTableCell className='w-md-33' label='Quantidade de parcelas' value={ contract.get('num_parcelas') } />
            <ViewTableCell className='w-md-33' label='Valor do seguro mês' value={ contract.getFormatedCurrency('valor_seguro') } />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell noBorderLeft={ true } className='w-md-33' label='Data do contrato' value={ contract.getFormatedDate('data_solicitacao') } />
            <ViewTableCell className='w-md-33' label='IOF' value={ contract.getFormatedCurrency('valor_iof') } />
            <ViewTableCell className='w-md-33' label='IOF %' value={ contract.getFormatedPercent('valor_seguro') } />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell noBorderLeft={ true } className='w-md-33' label='IOF Complementar %' value={ contract.getFormatedPercent('taxa_iof_complementar') } />
            <ViewTableCell className='w-md-33' label='CET a.m. %' value={ contract.getFormatedPercent('taxa_cet_mes') } />
            <ViewTableCell className='w-md-33' label='Valor de tarifas' value={ contract.getFormatedCurrency('valor_tarifas') } />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell noBorderLeft={ true } className='w-md-33' label='Taxa de multa' value={ contract.getFormatedPercent('taxa_multa') } />
            <ViewTableCell className='w-md-33' label='Valor financiado' value={ contract.getFormatedCurrency('valor_financiado') } />
            <ViewTableCell className='w-md-33' label='Valor total devido' value={ contract.getFormatedCurrency('valor_total_devido') } />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell noBorderLeft={ true } className='w-md-100' label='Taxa de multa' value={ contract.getFormatedCurrency('valor_liberado') } />
          </ViewTableRow>
        </ViewTable>
      </Container>

      <Container isWhiteBackground={ true } className='p-4 mt-3'>
        <ViewTable title={ `Parcelas (${ options.get('totalPaid') }/${ options.get('total') })` }>
          { receivables.map((receivable, inx) => {
            const status = receivable.getStatusLabelAndColor()
            return (
              <ViewTableRow key={ receivable.get('id') }>
                <ViewTableCell
                  noBorderLeft={ true }
                  noFullWidth={ true }
                  className='w-50'
                  valueClassName={ receivable.isFuture() && !receivable.isPending() ? 'text-low-dark' : '' }
                  value={ `${ inx + 1 }ª Parcela (${ receivable.getFormatedDate('vencimento_em') })` }
                />
                <ViewTableCell
                  noFullWidth={ true }
                  className='w-50'
                  valueClassName={ `d-md-flex align-items-center ${ receivable.isFuture() && !receivable.isPending() ? 'text-low-dark' : '' }` }
                  value={ receivable.getFormatedCurrency('valor_parcela') }
                >
                  <span className={ `d-block ml-auto ${ status.className }` }>{ status.label }</span>
                </ViewTableCell>
              </ViewTableRow>
            )
          }) }
        </ViewTable>
      </Container>
    </Fragment>
  )
}

ContractView.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default React.memo(ContractView)

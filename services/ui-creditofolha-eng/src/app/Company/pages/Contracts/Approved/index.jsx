import React, { Fragment, useEffect, useCallback, useState } from 'react'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import { useSelector, useDispatch } from 'react-redux'
import Tabs, { Tab } from 'components/Tabs'
import { ContractStatus } from 'constants/contracts'
import { contractsAsyncRequest, contractsResetResults,
  contractsUpdatePage } from 'company/actions/contracts'
import { approvedAverbationQuery } from 'company/queries/contracts'
import Pagination from 'components/Pagination'

import ContractsList from './ContractsList'

const TAB_ALL = 'all'
const TAB_ACTIVE = 'active'
const TAB_FINISHED = 'closed'

const CONTRACT_TAB_STATUS = {
  [TAB_ALL]: '',
  [TAB_ACTIVE]: [ContractStatus.ACTIVE, ContractStatus.EFFECTIVED, ContractStatus.PENDING_DOC, ContractStatus.PENDING_SIGN].join(','),
  [TAB_FINISHED]: [ContractStatus.CANCELED, ContractStatus.FINISHED, ContractStatus.REVERSED].join(','),
}

const ContractsApproved = () => {
  const dispatch = useDispatch()
  const [activeTab, changeActiveTab] = useState(TAB_ALL)
  const options = useSelector(({ company }) => company.contracts.get('options'))
  const pages = useSelector(({ company }) => company.contracts.getTotalPages())
  const selectedPage = options.get('currentPageIndex')

  const requestContractsList = useCallback(() => {
    dispatch(contractsAsyncRequest(approvedAverbationQuery, {
      status_averbacao: 'averbado',
      status: CONTRACT_TAB_STATUS[activeTab],
      ordering: '-data_solicitacao',
    }))
  }, [activeTab])

  useEffect(() => () => {
    dispatch(contractsResetResults())
  }, [])

  useEffect(() => {
    requestContractsList()
  }, [selectedPage, activeTab])

  const onPageChange = useCallback((page) => () => {
    dispatch(contractsUpdatePage(page))
  }, [])

  const onTabChange = useCallback((newActiveTab) => {
    dispatch(contractsUpdatePage(0))
    changeActiveTab(newActiveTab)
  }, [changeActiveTab])

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Contratos aprovados</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container className='p-3'>
        <Tabs
          activeKey={ activeTab }
          onTabChange={ onTabChange }
          mountAllTabsOnRender={ true }
        >
          <Tab tabKey={ TAB_ALL } tabName='Todos'>
            <ContractsList />
          </Tab>
          <Tab tabKey={ TAB_ACTIVE } tabName='Ativos'>
            <ContractsList />
          </Tab>
          <Tab tabKey={ TAB_FINISHED } tabName='Encerrados'>
            <ContractsList />
          </Tab>
        </Tabs>
      </Container>
      <ColumnWrapper>
        <ColumnLeft>
          <Pagination
            pages={ pages }
            selectedPage={ selectedPage }
            onChange={ onPageChange }
          />
        </ColumnLeft>
      </ColumnWrapper>
    </Fragment>
  )
}

export default React.memo(ContractsApproved)

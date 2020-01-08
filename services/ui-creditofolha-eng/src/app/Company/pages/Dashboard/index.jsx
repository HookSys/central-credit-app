import React, { useEffect } from 'react'
import moment from 'moment'
import Layout from 'templates/PageTemplate'

import { Receipt, SwapHoriz } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { EEntityKeys } from 'constants/entity'

import { dashboardContractQuery } from 'company/queries/contracts'
import { contractsAsyncRequest, contractsResetResults } from 'company/actions/contracts'
import { getDashboardContracts } from 'company/selectors/contractsSelectors'

import { alertsAsyncRequest } from 'core/actions/alerts'
import { getDashboardAlerts } from 'core/selectors/alertsSelectors'

import { dashboardPaymentLotQuery } from 'company/queries/paymentLots'
import { paymentLotAsyncRequest } from 'company/actions/paymentLots'

import Chart from 'components/Chart'
import GridLayout from 'components/GridLayout'
import GridArea from 'components/GridArea'
import Timeline, { TimelineItem } from 'components/Timeline'

const Dashboard = () => {
  const user = useSelector(state => state.user.get('data'))
  const selectedEntity = user.getSelectedEntity()

  const dashboardInfos = useSelector(({ company }) => getDashboardContracts(company))
  const contractsCount = useSelector(({ company }) => company.contracts.get('count'))
  const paymentLot = useSelector(({ company }) => company.paymentLots.getIn(['options', 'selected']))

  const alerts = useSelector(state => getDashboardAlerts(state))
  const dispatch = useDispatch()

  useEffect(() => {
    const currentDate = moment().format('YYYYMM')
    dispatch(contractsAsyncRequest(dashboardContractQuery, {
      efetivado_em_depois_de: moment().subtract(5, 'months').format('YYYY-MM-DD'),
      efetivado_em_antes_de: moment().format('YYYY-MM-DD'),
      averbacao: 'averbado',
    }))
    dispatch(paymentLotAsyncRequest(dashboardPaymentLotQuery, currentDate))
    dispatch(alertsAsyncRequest({
      relacionado_a_tipo: EEntityKeys.COMPANY,
      relacionado_a_id: selectedEntity.get('entidade_id'),
      lidos: false,
    }))

    return () => {
      dispatch(contractsResetResults())
    }
  }, [])

  return (
    <Layout>
      <Chart
        data={ {
          labels: dashboardInfos.get('keys'),
          datasets: [{
            label: 'Contratos',
            backgroundColor: dashboardInfos.get('backgroundColors'),
            data: dashboardInfos.get('data'),
            barPercentage: 0.2,
          }],
        } }
      >
        <GridLayout
          gridTemplate={ `
            'averbacao lote'
            / 1fr 1fr
          ` }
          gridGap='1rem'
          className='bg-primary w-100 p-2'
        >
          <GridArea
            name='averbacao'
            className='px-4 py-2 border-right border-white text-white'
          >
            <Receipt
              className='h1 d-block'
            />
            <span className='h4 d-block mb-0'>Averbação</span>
            <span className='d-block'>{ `${ contractsCount } contratos pendentes` }</span>
          </GridArea>
          <GridArea
            name='lote'
            className='px-4 py-2 text-white'
          >
            <SwapHoriz
              className='h1 d-block'
            />
            <span className='h4 d-block mb-0'>{ paymentLot ? 'Lote disponível' : 'Nenhum lote disponível' }</span>
            <span className='d-block'>{ paymentLot ? `Data limite ${ paymentLot.getFormatedDate('vencimento_em') }` : 'Aguarde o próximo mês' }</span>
          </GridArea>
        </GridLayout>
      </Chart>
      {
        alerts.size > 0 && alerts.keySeq().toArray().map((key, i) => {
          const currentAlert = alerts.get(key)
          const title = moment(currentAlert.get(0).get('data')).format('DD MMM')

          return (
            <Timeline title={ title } key={ `alert-${ i + 1 }` }>
              {
                currentAlert.map((alert, inx) => (
                  <TimelineItem key={ `id-${ inx + 1 }` }>
                    <span className='text-primary d-block'>
                      { alert.get('titulo') }
                    </span>
                    <span>{ alert.get('mensagem') }</span>
                  </TimelineItem>
                ))
              }
            </Timeline>
          )
        })
      }
    </Layout>
  )
}

export default Dashboard

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Receipt, SwapHoriz } from '@material-ui/icons'
import { dashboardContractQuery, dashboardPaymentLotQuery } from 'queries'
import { contractListAsyncRequestCEP } from 'actions/contract'
import { paymentLotAsyncRequest } from 'actions/paymentLot'
import { alertAsyncRequest } from 'actions/alert'
import Page from 'templates/PageTemplate'
import { getDashboardInfos } from 'selectors/dashboardSelector'
import { Chart, GridLayout, GridArea } from 'components'

const Dashboard = () => {
  const dashboardInfos = useSelector(state => getDashboardInfos(state))
  const contractsCount = useSelector(state => state.contract.get('count'))
  const paymentLot = useSelector(state => state.paymentLot.getIn(['options', 'selected']))
  const dispatch = useDispatch()

  useEffect(() => {
    const currentDate = moment().format('YYYYMM')
    dispatch(contractListAsyncRequestCEP(dashboardContractQuery, null, null, null, {
      efetivado_em_depois_de: moment().subtract(5, 'months').format('YYYY-MM-DD'),
      efetivado_em_antes_de: moment().format('YYYY-MM-DD'),
      averbacao: 'averbado',
    }))
    dispatch(paymentLotAsyncRequest(dashboardPaymentLotQuery, currentDate))
    dispatch(alertAsyncRequest())
  }, [])

  return (
    <Page>
      <Chart
        data={ {
          labels: dashboardInfos.get('keys'),
          datasets: [{
            label: 'Contratos',
            backgroundColor: dashboardInfos.get('backgroundColors'),
            data: dashboardInfos.get('data'),
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
    </Page>
  )
}

export default Dashboard

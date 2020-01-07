import React, { useCallback } from 'react'
import { useStructure } from 'hooks'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'
import { bindPathParams } from 'helpers'
import { getPaymentLotsGroupByYear } from 'company/selectors/paymentLotsSelectors'
import { paymentLotSelectItem } from 'company/actions/paymentLots'
import PaymentLotDetailCard from 'company/components/PaymentLotDetailCard'
import { PAYMENT_LOT_STATUS_COLOR, PAYMENT_LOT_STATUS_DESCRIPTION } from 'constants/paymentLot'

const { Layout, Header, Title, BackLink, Cards, Card } = SidePanelTemplate

const RepassDetailViewSidePanel = () => {
  const { pages } = useStructure()
  const { paymentLotMonth } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const paymentLotsByYear = useSelector((state) => getPaymentLotsGroupByYear(state))

  const onPaymentLotCardClick = useCallback((paymentLot) => () => {
    dispatch(paymentLotSelectItem(paymentLot))
    const route = bindPathParams({
      paymentLotMonth: paymentLot.get('mes_referencia'),
    }, pages.REPASS.DETAIL.VIEW)
    setTimeout(() => history.push(route))
  }, [])

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={ pages.REPASS.DETAIL.INDEX }>
            Voltar
          </BackLink>
          <Title>
            Detalhamento
          </Title>
        </Header>
        <div className='w-100 mt-3'>
          { paymentLotsByYear.size > 0 ? paymentLotsByYear.map((item) => {
            const paymentLots = item.get('items')
            return (
              <div className='mb-3' key={ item.get('year') }>
                <h6 className='mx-3 mb-0'>{ item.get('year') }</h6>
                <Cards className='mt-2'>
                  { paymentLots.map((paymentLot) => {
                    const status = paymentLot.get('status').get(0)
                    return (
                      <Card
                        tooltip={ PAYMENT_LOT_STATUS_DESCRIPTION[status] }
                        className={ PAYMENT_LOT_STATUS_COLOR[status] }
                        key={ paymentLot.get('mes_referencia') }
                        isActive={ paymentLot.get('mes_referencia') === paymentLotMonth }
                        onClick={ onPaymentLotCardClick(paymentLot) }
                      >
                        <PaymentLotDetailCard paymentLot={ paymentLot } />
                      </Card>
                    )
                  }) }
                </Cards>
              </div>
            )
          }) : (
            <span className='d-block w-100 mt-2 text-center'>
              Sem registros
            </span>
          ) }
        </div>
      </Layout>
    </SidePanelRender>
  )
}

export default React.memo(RepassDetailViewSidePanel)

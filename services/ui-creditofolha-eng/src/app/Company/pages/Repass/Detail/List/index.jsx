import React, { Fragment, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import Cards, { Card, CardRow, CardTitle, CardAlert, CardContent, CardInfo } from 'components/Cards'
import { paymentLotsAsyncRequest, paymentLotSelectItem } from 'company/actions/paymentLots'
import { repassDetailingLotQuery } from 'company/queries/paymentLots'
import { getPaymentLotsGroupByYear } from 'company/selectors/paymentLotsSelectors'
import { bindPathParams } from 'helpers'
import { PAYMENT_LOT_STATUS_COLOR, PAYMENT_LOT_STATUS_DESCRIPTION } from 'constants/paymentLot'
import RepassSidePanel from 'company/pages/Repass/SidePanel'

const RepassDetailList = ({ parent: { parent }, entity: { pages: entityPages } }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const paymentLotsByYear = useSelector((state) => getPaymentLotsGroupByYear(state))

  useEffect(() => {
    dispatch(paymentLotsAsyncRequest(repassDetailingLotQuery, { limit: 50 }))
  }, [])

  const onPaymentLotClick = useCallback((paymentLot) => () => {
    dispatch(paymentLotSelectItem(paymentLot))
    const route = bindPathParams({
      paymentLotMonth: paymentLot.get('mes_referencia'),
    }, entityPages.REPASS.DETAIL.VIEW)
    setTimeout(() => history.push(route))
  }, [])

  return (
    <Fragment>
      <RepassSidePanel
        pages={ entityPages.REPASS }
        routes={ parent.routes }
      />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Detalhamento</Title>
        </ColumnLeft>
      </ColumnWrapper>
      { paymentLotsByYear.size > 0 ? paymentLotsByYear.map((item) => {
        const paymentLots = item.get('items')
        return (
          <div className='mb-4' key={ item.get('year') }>
            <h4>{ item.get('year') }</h4>
            <Container className='px-4 pt-4 pb-0 mt-2'>
              <Cards>
                { paymentLots.map((paymentLot) => {
                  const status = paymentLot.get('status').get(0)
                  const contracts = paymentLot.get('descontos_por_funcionario').size

                  return (
                    <Card
                      key={ paymentLot.get('mes_referencia') }
                      onClick={ onPaymentLotClick(paymentLot) }
                    >
                      <CardRow>
                        <CardTitle>
                          { paymentLot.getFormatedReferenceMonth('MMMM') }
                        </CardTitle>
                        <CardAlert type={ PAYMENT_LOT_STATUS_COLOR[status] }>
                          { PAYMENT_LOT_STATUS_DESCRIPTION[status] }
                        </CardAlert>
                      </CardRow>
                      <CardContent>
                        <CardInfo title='Repasse Total'>
                          { paymentLot.getFormatedCurrency('valor_previsto') }
                        </CardInfo>
                        <CardInfo title='Contratos'>
                          { `${ contracts } contratos` }
                        </CardInfo>
                      </CardContent>
                    </Card>
                  )
                }) }
              </Cards>
            </Container>
          </div>
        )
      }) : (
        <Container isWhiteBackground={ true }>
          No rows
        </Container>
      ) }
    </Fragment>
  )
}

RepassDetailList.propTypes = {
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
}

export default React.memo(RepassDetailList)

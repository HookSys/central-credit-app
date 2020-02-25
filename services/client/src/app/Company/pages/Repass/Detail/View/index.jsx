import React, { Fragment, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ColumnWrapper, ColumnLeft, Title, Container, HeaderInfo } from 'templates/PageTemplate'
import { paymentLotByMonthAsyncRequest, paymentLotsAsyncRequest, paymentLotsResetSelected } from 'company/actions/paymentLots'
import { repassDetailingLotQuery } from 'company/queries/paymentLots'
import { ToastContext } from 'components/ToastProvider'
import { PAYMENT_LOT_REASONS_DESCRIPTION } from 'constants/paymentLot'
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from 'components/Table'
import UserInfo from 'components/UserInfo'

import RepassDetailViewSidePanel from './SidePanel'

const RepassDetailView = ({ entity: { pages } }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { paymentLotMonth } = useParams()
  const { showErrorToast } = useContext(ToastContext)
  const paymentLot = useSelector(({ company }) => company.paymentLots.getIn(['options', 'selected']))
  const paymentLots = useSelector(({ company }) => company.paymentLots.get('results'))

  useEffect(() => {
    if (!paymentLot || paymentLot.get('mes_referencia') !== paymentLotMonth) {
      dispatch(paymentLotByMonthAsyncRequest(repassDetailingLotQuery, paymentLotMonth))
        .then((response) => {
          if (!response) {
            showErrorToast({
              message: 'Lote não encontrado!',
            })
            history.push(pages.REPASS.DETAIL.INDEX)
          } else if (paymentLots.size === 0) {
            dispatch(paymentLotsAsyncRequest(repassDetailingLotQuery, { limit: 50 }))
          }
        })
    }
  }, [paymentLotMonth])

  useEffect(() => () => dispatch(paymentLotsResetSelected()), [])

  if (!paymentLot) {
    return null
  }

  const discounts = paymentLot.get('descontos_por_funcionario')
  return (
    <Fragment>
      <RepassDetailViewSidePanel />
      <ColumnWrapper>
        <ColumnLeft>
          <div className='d-flex justify-content-md-end flex-wrap'>
            <div className='w-100 w-md-auto'>
              <Title>{ paymentLot.getFormatedReferenceMonth('MMMM YYYY')}</Title>
              <span className='d-block h5 font-weight-lighter'>Detalhes do repasse</span>
            </div>
            <HeaderInfo
              title='Valor Original'
              className='mt-3 mt-md-0 ml-md-5 pr-2'
            >
              { paymentLot.getFormatedCurrency('valor_previsto') }
            </HeaderInfo>
            <HeaderInfo
              title='Valor Atual'
              className='mt-3 mt-md-0 ml-3 ml-md-4 pr-2'
            >
              { paymentLot.getFormatedCurrency('valor_descontado') }
            </HeaderInfo>
          </div>
        </ColumnLeft>
      </ColumnWrapper>
      <Container className='p-0'>
        <Table>
          <TableHead>
            <TableHeader width='20%'>
              Nome
            </TableHeader>
            <TableHeader width='20%'>
              Valor da parcela
            </TableHeader>
            <TableHeader>
              Valor descontado
            </TableHeader>
            <TableHeader>
              Diferença
            </TableHeader>
            <TableHeader width='20%' />
          </TableHead>
          <TableBody>
            { discounts.size > 0 && discounts.map((discount) => {
              const difference = discount.getDifferenceValue()
              const employee = discount.get('funcionario')
              const fullname = employee.getFullName()
              const cpf = employee.get('cpf')
              return (
                <TableRow key={ cpf }>
                  <TableCell>
                    <UserInfo
                      className='text-primary'
                      avatarClassName='text-primary border-primary'
                      infoClassName='font-weight-lighter text-low-dark'
                      fullName={ fullname }
                    >
                      { `CPF: ${ cpf }` }
                    </UserInfo>
                  </TableCell>
                  <TableCell>
                    { discount.getFormatedCurrency('valor_previsto') }
                  </TableCell>
                  <TableCell>
                    { discount.getFormatedCurrency('valor_descontado') }
                  </TableCell>
                  <TableCell>
                    { discount.getFormatedCurrency(difference) }
                  </TableCell>
                  <TableCell>
                    { PAYMENT_LOT_REASONS_DESCRIPTION[discount.get('divergencia')] }
                  </TableCell>
                </TableRow>
              )
            }) }
          </TableBody>
        </Table>
      </Container>
    </Fragment>
  )
}

RepassDetailView.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default React.memo(RepassDetailView)

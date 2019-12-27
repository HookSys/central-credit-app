import React, { Fragment, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Map } from 'immutable'
import { useSelector, useDispatch } from 'react-redux'
import { FieldArray, Form, reduxForm } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, ColumnRight, Title, HeaderInfo, Container } from 'templates/PageTemplate'
import Button from 'components/Button'
import CircularProgressbar from 'components/CircularProgressBar'
import RepassSidePanel from 'company/pages/Repass/SidePanel'
import { capitalize } from 'helpers'
import { CalendarToday } from '@material-ui/icons'
import { Table, TableHead, TableHeader, TableBody } from 'components/Table'
import { repassDiscountLotQuery } from 'company/queries/paymentLots'
import { paymentLotByMonthAsyncRequest } from 'company/actions/paymentLots'
import EmployeeFieldArray from './EmployeeFieldArray'

const formName = 'repassDiscountForm'

const RepassDiscountList = (
  { parent, handleSubmit, initialize, submit, invalid, pristine, entity: { pages: entityPages } }
) => {
  const dispatch = useDispatch()
  const date = moment()
  const currentMonth = date.format('YYYYMM')
  const paymentLot = useSelector(({ company }) => company.paymentLots.getIn(['options', 'selected']))

  const onSidePanelChange = useCallback(() => {
  }, [])

  const onSubmit = useCallback(() => {
  }, [])

  useEffect(() => {
    dispatch(paymentLotByMonthAsyncRequest(repassDiscountLotQuery, currentMonth))
  }, [])

  useEffect(() => {
    if (paymentLot) {
      initialize(new Map({
        descontos_por_funcionario: paymentLot.get('descontos_por_funcionario'),
      }))
    }
  }, [paymentLot])

  if (!paymentLot) {
    return null
  }

  const maturityIn = paymentLot.getFormatedDate('vencimento_em')
  const today = date.startOf('day')
  const end = moment(maturityIn, 'DD/MM/YYYY').startOf('day')
  const start = moment(maturityIn, 'DD/MM/YYYY').subtract(1, 'months').startOf('month')
  const percentage = Math.round((Math.abs(today - start) / Math.abs(end - start)) * 100)
  const daysRemaning = Math.floor(moment.duration(moment(maturityIn, 'DD/MM/YYYY').startOf('day') - date.startOf('day')).asDays())

  return (
    <Fragment>
      <RepassSidePanel
        pages={ entityPages.REPASS }
        routes={ parent.routes }
        onChange={ onSidePanelChange }
      />
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <Title>{ `Desconto do salário de ${ capitalize(date.format('MMMM')) } ${ date.format('YYYY') }` }</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={ true }>
          <Button disabled={ invalid || pristine } className='btn btn-default bg-white mr-3'>
            Salvar
          </Button>
          <Button disabled={ invalid || !pristine } onClick={ () => submit() }>
            Enviar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <ColumnWrapper className='mt-0 mb-4 d-flex flex-column flex-md-row'>
        <ColumnLeft>
          <div className='d-flex justify-content-between justify-content-md-end flex-wrap'>
            <div className='d-flex align-items-end justify-content-center mr-auto mr-lg-0'>
              <CircularProgressbar
                percentage={ percentage }
                Icon={ CalendarToday }
              />
              <div className='px-3'>
                <span className='text-company'>{`Faltam ${ daysRemaning } dias`}</span>
                <span className='text-secondary d-block'>{`Enviar até ${ maturityIn }`}</span>
              </div>
            </div>
            <HeaderInfo
              title='Valor Original'
              className='mt-3 mt-md-0 pr-2'
            >
              { paymentLot.getFormatedCurrency('valor_previsto') }
            </HeaderInfo>
            <HeaderInfo
              title='Valor Atual'
              className='mt-3 mt-md-0 ml-md-4 pr-2'
            >
              { paymentLot.getFormatedCurrency('valor_descontado') }
            </HeaderInfo>
          </div>
        </ColumnLeft>
      </ColumnWrapper>
      <Container className='p-0'>
        <Form onSubmit={ handleSubmit(onSubmit) }>
          <Table className='min-width-lg-only mt-4 mt-lg-0'>
            <TableHead className='d-none d-lg-table-row'>
              <TableHeader width='350px'>
                Nome
              </TableHeader>
              <TableHeader>
                Matrícula
              </TableHeader>
              <TableHeader>
                Parcela
              </TableHeader>
              <TableHeader width='200px'>
                Valor de desconto
              </TableHeader>
              <TableHeader width='250px'>
                Motivo
              </TableHeader>
              <TableHeader />
            </TableHead>
            <TableBody>
              <FieldArray
                name='descontos_por_funcionario'
                discounts={ paymentLot.get('descontos_por_funcionario') }
                component={ EmployeeFieldArray }
                rerenderOnEveryChange={ true }
              />
            </TableBody>
          </Table>
        </Form>
      </Container>
    </Fragment>
  )
}

RepassDiscountList.propTypes = {
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: formName,
})(RepassDiscountList)

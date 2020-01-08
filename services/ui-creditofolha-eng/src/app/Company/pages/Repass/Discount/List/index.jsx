import React, { Fragment, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { Map } from 'immutable'
import { useSelector, useDispatch } from 'react-redux'
import { FieldArray, Form, reduxForm } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, ColumnRight, Title, HeaderInfo, Container } from 'templates/PageTemplate'
import Button from 'components/Button'
import CircularProgressbar from 'components/CircularProgressBar'
import { capitalize } from 'helpers'
import { CalendarToday } from '@material-ui/icons'
import { Table, TableHead, TableHeader, TableBody } from 'components/Table'
import { paymentLotByMonthSaveRequest,
  paymentLotByMonthSendRequest } from 'company/actions/paymentLots'
import { ToastContext } from 'components/ToastProvider'
import EmployeeFieldArray from './FieldArray'

const formName = 'repassDiscountForm'

const RepassDiscountList = (
  { handleSubmit, initialize, submit, invalid, pristine, entity: { pages } }
) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const paymentLot = useSelector(({ company }) => company.paymentLots.getIn(['options', 'selected']))
  const errors = useSelector(state => state.errors.get('errors'))

  const onSubmit = useCallback(async (form) => {
    if (paymentLot) {
      const currentMonth = paymentLot.get('mes_referencia')
      const discounts = form.get('descontos_por_funcionario')
      const values = paymentLot.getRequest(discounts)
      const response = await dispatch(paymentLotByMonthSaveRequest(currentMonth, values))
      if (!response) {
        showErrorToast({
          message: 'Ajuste os erros abaixo antes de prosseguir.',
        })
        return false
      }

      showSuccessToast({
        message: 'Alterações efetuadas com sucesso.',
      })
      return true
    }

    return false
  }, [paymentLot])

  const onSend = useCallback(async () => {
    if (paymentLot) {
      const currentMonth = paymentLot.get('mes_referencia')
      const response = await dispatch(paymentLotByMonthSendRequest(currentMonth))
      if (!response) {
        showErrorToast({
          message: 'Ocorreu um problema ao processar a requisição, tente novamente mais tarde.',
        })
        return false
      }

      showSuccessToast({
        message: 'Lotes enviados com sucesso!',
      })
      setTimeout(() => history.push(pages.REPASS.INDEX.SUCCESS))

      return true
    }

    return false
  }, [paymentLot])

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

  const date = paymentLot.getReferenceMonth()
  const maturityIn = paymentLot.getFormatedDate('vencimento_em')
  const today = date.startOf('day')
  const end = moment(maturityIn, 'DD/MM/YYYY').startOf('day')
  const start = moment(maturityIn, 'DD/MM/YYYY').subtract(1, 'months').startOf('month')
  const percentage = Math.round((Math.abs(today - start) / Math.abs(end - start)) * 100)
  const daysRemaning = Math.floor(moment.duration(moment(maturityIn, 'DD/MM/YYYY').startOf('day') - date.startOf('day')).asDays())
  const hasErrors = errors && errors.filter((error) => error.get('path').includes('descontos_por_funcionario')).size > 0

  return (
    <Fragment>
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <Title>{ `Desconto do salário de ${ capitalize(date.format('MMMM')) } ${ date.format('YYYY') }` }</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={ true }>
          <Button disabled={ invalid || (pristine && !hasErrors) } className='btn btn-default mr-3' onClick={ () => submit() }>
            Salvar
          </Button>
          <Button disabled={ hasErrors || !pristine } onClick={ onSend }>
            Enviar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <ColumnWrapper className='mt-0 mb-4 d-flex flex-column flex-md-row'>
        <ColumnLeft>
          <div className='d-flex flex-wrap'>
            <div className='d-flex align-items-end w-100 w-sm-auto'>
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
              className='mt-3 mt-md-0 ml-sm-4 pr-2'
            >
              { paymentLot.getFormatedCurrency('valor_previsto') }
            </HeaderInfo>
            <HeaderInfo
              title='Valor Atual'
              className='mt-3 mt-md-0 ml-4 pr-2'
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
                errors={ errors }
              />
            </TableBody>
          </Table>
        </Form>
      </Container>
    </Fragment>
  )
}

RepassDiscountList.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  entity: PropTypes.object.isRequired,
}

export default reduxForm({
  form: formName,
})(RepassDiscountList)

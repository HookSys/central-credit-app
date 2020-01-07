import React, { Fragment, useEffect, useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, ColumnRight, Title, Container } from 'templates/PageTemplate'
import { employeeDemissionAsyncRequest, employeeFireRequest, employeeResetSelected } from 'company/actions/employees'
import { FormArea, Row, Element } from 'company/components/FormContent'
import Button from 'components/Button'
import { ToastContext } from 'components/ToastProvider'
import { CalendarToday } from '@material-ui/icons'
import { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { demissionEmployeeQuery } from 'company/queries/employees'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'

import ReduxFormInput from 'components/ReduxFormInput'
import ReduxFormInputBuilder from 'components/ReduxFormInput/Builder'
import InputAddonBuilder from 'components/ReduxFormInput/builders/InputAddonBuilder'

import { required, dateRequired, maxLength } from 'form/validators'
import { dateNormalizer, currencyMask } from 'form/normalizers'

const InputCalendarAddon = InputAddonBuilder()
  .leftPosition()
  .renderMethod(() => (
    <div className='icon-left-addon'>
      <CalendarToday />
    </div>
  ))
  .build()

const ReduxFormInputCalendar = ReduxFormInputBuilder()
  .leftAddon(InputCalendarAddon)
  .build()

const ConfirmDemissionModal = CreateGenericConfirmModal({
  confirmBtnClassName: 'btn-danger',
  cancelOnClose: true,
})

export const formName = 'demissionEmployeeForm'

const EmployeesDemissionInform = (
  { submit, invalid, initialize, handleSubmit, entity: { pages } }
) => {
  const dispatch = useDispatch()
  const { employeeId } = useParams()
  const history = useHistory()
  const [demission, setDemission] = useState(null)
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)
  const employee = useSelector(({ company }) => company.employees.getIn(['options', 'selected']))

  const employeeNotFound = () => {
    showErrorToast({
      message: 'Funcionário não encontrado!',
    })
    history.push(pages.EMPLOYEES.DEMISSION.INDEX)
  }

  const balanceDue = employee ? employee.get('saldo_devedor') : 0
  const maxDiscountAmount = useCallback(maxLength(
    balanceDue,
    `Valor informado é maior que saldo devedor de ${ employee && employee.getFormatedCurrency('saldo_devedor') }`
  ), [balanceDue])

  useEffect(() => {
    if (!employeeId) {
      employeeNotFound()
    } else {
      dispatch(employeeDemissionAsyncRequest(demissionEmployeeQuery, employeeId))
        .then((response) => {
          if (!response) {
            employeeNotFound()
          }
        })
    }
    return () => {
      dispatch(employeeResetSelected())
    }
  }, [employeeId])

  useEffect(() => {
    if (employee) {
      initialize({
        demissao_em: moment().add(1, 'd').format('DD/MM/YYYY'),
        saldo_devedor: employee.get('saldo_devedor'),
        valor_descontado: employee.get('saldo_devedor'),
      })
    }
  }, [employee])

  const onSubmit = useCallback((values) => {
    setDemission(values)
  }, [])

  const onDemissionConfirm = useCallback(async () => {
    const response = await dispatch(employeeFireRequest(
      employee.get('id'),
      demission.get('demissao_em'),
      demission.get('valor_descontado')
    ))
    setDemission(null)
    if (response) {
      showSuccessToast({
        message: 'Funcionário demitido com sucesso!',
      })
      history.push(pages.EMPLOYEES.DEMISSION.SUCCESS, {
        value: employee.getFormatedCurrency(demission.get('valor_descontado')),
      })
    } else {
      showErrorToast({
        message: 'Verifique os avisos e tente novamente',
      })
    }
  }, [])

  const onDemissionClose = useCallback(() => {
    setDemission(null)
  }, [])

  if (!employee) {
    return null
  }

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Informar demissão</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={ true }>
          <Button className='btn btn-default mr-3' onClick={ () => history.goBack() }>
            Cancelar
          </Button>
          <Button className='btn btn-danger' onClick={ () => submit() } disabled={ invalid }>
            Confirmar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={ true }>
        <div className='row'>
          <div className='col-12'>
            <ViewTableRow>
              <ViewTableCell noBorderLeft={ true } className='w-md-33' label='Funcionário' value={ employee.getFullName() } />
              <ViewTableCell className='w-md-33' label='Matrícula' value={ employee.get('matricula') } />
              <ViewTableCell className='w-md-33' label='CPF' value={ employee.get('cpf') } />
            </ViewTableRow>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Form onSubmit={ handleSubmit(onSubmit) }>
              <FormArea>
                <Row>
                  <Element lg='5' xl='4' xxl='3'>
                    <Field
                      type='text'
                      name='demissao_em'
                      label='Data de demissão:'
                      id='demissao_em'
                      placeholder='DD/MM/YYYY'
                      component={ ReduxFormInputCalendar }
                      validate={ [dateRequired] }
                      normalize={ dateNormalizer }
                    />
                  </Element>
                </Row>
                <Row>
                  <Element lg='5' xl='4' xxl='3'>
                    <Field
                      type='text'
                      name='saldo_devedor'
                      label='Saldo devedor:'
                      id='saldo_devedor'
                      disabled={ true }
                      component={ ReduxFormInput }
                      { ...currencyMask }
                    />
                  </Element>
                </Row>
                <Row>
                  <Element lg='5' xl='4' xxl='3'>
                    <Field
                      type='text'
                      name='valor_descontado'
                      label='Valor descontado:'
                      id='valor_descontado'
                      component={ ReduxFormInput }
                      validate={ [required, maxDiscountAmount] }
                      { ...currencyMask }
                    />
                  </Element>
                </Row>
              </FormArea>
            </Form>
          </div>
        </div>
      </Container>
      <ConfirmDemissionModal
        onConfirm={ onDemissionConfirm }
        onCancel={ onDemissionClose }
        isOpen={ demission !== null }
      >
        <span>
          Deseja confirmar a demissão de <strong>{ `${ employee.getFullName() }` }</strong>?
        </span>
      </ConfirmDemissionModal>
    </Fragment>
  )
}

EmployeesDemissionInform.propTypes = {
  entity: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  initialize: PropTypes.func.isRequired,
}

export default reduxForm({
  form: formName,
})(EmployeesDemissionInform)

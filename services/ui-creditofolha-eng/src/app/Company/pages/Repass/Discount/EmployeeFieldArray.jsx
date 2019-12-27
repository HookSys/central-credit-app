import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field } from 'redux-form/immutable'
import { discountReasons } from 'constants/general'
import { TableRow, TableCell, TableCard, TableCardItem } from 'components/Table'
import Avatar from 'components/Avatar'
import { useWindowSize } from 'hooks'

import { required } from 'form/validators'
import { currencyMask } from 'form/normalizers'

import ReduxFormSelect from 'components/ReduxFormSelect'
import ReduxFormInput from 'components/ReduxFormInput'

const EmployeeFieldArray = ({ fields, discounts, errors }) => {
  const size = useWindowSize()

  if (['XS', 'SM'].includes(size)) {
    return (
      <Fragment>
        { fields.map((field, i) => {
          const paymentLot = discounts.get(i)
          const employee = paymentLot.get('funcionario')
          const fullname = employee.getFullName()

          const paymentLotReduxForm = fields.get(i)
          const diff = paymentLot.get('valor_previsto') - paymentLotReduxForm.get('valor_descontado')
          return (
            <TableCard key={ `i-${ (i + 1) }` }>
              <TableCardItem>
                <div className='d-flex align-items-center'>
                  <Avatar
                    title={ fullname }
                    className='text-primary border-primary'
                  />
                  <div className='d-flex flex-column justify-content-center ml-2'>
                    <span className='d-block text-primary mb-n1'>{ fullname }</span>
                    <span className='d-block font-size-sm font-weight-lighter text-low-dark'>{ `CPF: ${ employee.get('cpf') }` }</span>
                  </div>
                </div>
              </TableCardItem>
              <TableCardItem className='d-flex justify-content-between'>
                <div className='border-right border-gray w-50'>
                  <span className='font-size-sm text-low-dark'>Matrícula</span>
                  <span className='d-block'>{ employee.get('matricula') }</span>
                </div>
                <div>
                  <span className='font-size-sm text-low-dark'>Parcela</span>
                  <span className='d-block'>{ paymentLot.getFormatedCurrency('valor_previsto') }</span>
                </div>
              </TableCardItem>
              <TableCardItem>
                <Field
                  type='text'
                  label='Desconto'
                  name={ `${ field }.valor_descontado` }
                  id={ `${ field }.valor_descontado` }
                  component={ ReduxFormInput }
                  noMargin={ true }
                  hideError={ true }
                  validate={ [required] }
                  { ...currencyMask }
                />
              </TableCardItem>
              <TableCardItem>
                <Field
                  name={ `${ field }.divergencia` }
                  id={ `${ field }.divergencia` }
                  placeholder='Motivo'
                  validate={ [required] }
                  noMargin={ true }
                  hideError={ true }
                  options={ discountReasons }
                  component={ ReduxFormSelect }
                />
                <div className='bg-light text-center p-2 mt-3'>
                  <span
                    className={ classNames('font-weight-bold', {
                      'text-danger': diff < 0,
                      'text-success': diff > 0,
                    }) }
                  >
                    { paymentLot.getFormatedCurrency(diff) }
                  </span>
                </div>
              </TableCardItem>
            </TableCard>
          )
        }) }
      </Fragment>
    )
  }

  return (
    <Fragment>
      { fields.map((field, i) => {
        const paymentLot = discounts.get(i)
        const employee = paymentLot.get('funcionario')
        const fullname = employee.getFullName()

        const paymentLotReduxForm = fields.get(i)
        const diff = paymentLot.get('valor_previsto') - paymentLotReduxForm.get('valor_descontado')
        const hasError = errors && errors.filter((error) => error.get('path').includes(employee.get('cpf')))

        return (
          <Fragment key={ `i-${ (i + 1) }` }>
            { hasError.size > 0 && (
              <TableRow className='bg-alert-danger h-auto'>
                <TableCell colSpan='6'>
                  <span className='d-block text-center text-danger font-weight-bold my-2'>
                    { hasError.get(0).get('reason') }
                  </span>
                </TableCell>
              </TableRow>
            ) }
            <TableRow
              noSpacer={ hasError.size > 0 }
            >
              <TableCell>
                <div className='d-flex align-items-center'>
                  <Avatar
                    title={ fullname }
                    className='text-primary border-primary'
                  />
                  <div className='d-flex flex-column justify-content-center ml-2'>
                    <span className='d-block text-primary mb-n1'>{ fullname }</span>
                    <span className='d-block font-size-sm font-weight-lighter text-low-dark'>{ `CPF: ${ employee.get('cpf') }` }</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                { employee.get('matricula') }
              </TableCell>
              <TableCell>
                { paymentLot.getFormatedCurrency('valor_previsto') }
              </TableCell>
              <TableCell>
                <Field
                  type='text'
                  name={ `${ field }.valor_descontado` }
                  id={ `${ field }.valor_descontado` }
                  formClassName='mb-0'
                  component={ ReduxFormInput }
                  validate={ [required] }
                  hideError={ true }
                  { ...currencyMask }
                />
              </TableCell>
              <TableCell>
                <Field
                  name={ `${ field }.divergencia` }
                  id={ `${ field }.divergencia` }
                  placeholder='Motivo'
                  noMargin={ true }
                  validate={ [required] }
                  options={ discountReasons }
                  hideError={ true }
                  component={ ReduxFormSelect }
                />
              </TableCell>
              <TableCell>
                <span
                  className={ classNames('font-weight-bold', {
                    'text-danger': diff < 0,
                    'text-success': diff > 0,
                  }) }
                >
                  { paymentLot.getFormatedCurrency(diff) }
                </span>
              </TableCell>
            </TableRow>
          </Fragment>
        )
      }) }
    </Fragment>
  )
}

EmployeeFieldArray.propTypes = {
  fields: PropTypes.object.isRequired,
  discounts: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

export default EmployeeFieldArray

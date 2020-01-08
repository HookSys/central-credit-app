import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field } from 'redux-form/immutable'
import { discountReasons } from 'constants/general'
import { TableCard, TableCardItem, TableCardInfo, TableBoxInfo } from 'components/Table'
import UserInfo from 'components/UserInfo'

import { required } from 'form/validators'
import { currencyMask } from 'form/normalizers'

import ReduxFormSelect from 'components/ReduxFormSelect'
import ReduxFormInput from 'components/ReduxFormInput'

const EmployeeMobileFieldArray = ({ fields, discounts, errors }) => {
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
          <TableCard key={ `card-${ (i + 1) }` } isInvalid={ hasError.size > 0 }>
            { hasError.size > 0 && (
              <TableCardItem className='bg-alert-danger mx-n2' noBorder={ true }>
                <span className='d-block text-danger font-weight-bold'>
                  { hasError.get(0).get('reason') }
                </span>
              </TableCardItem>
            ) }
            <TableCardItem>
              <UserInfo
                className='text-primary'
                avatarClassName='text-primary border-primary'
                infoClassName='font-weight-lighter text-low-dark'
                fullName={ fullname }
              >
                { `CPF: ${ employee.get('cpf') }` }
              </UserInfo>
            </TableCardItem>
            <TableCardItem isTableCardInfo={ true }>
              <TableCardInfo size='50'>
                <TableBoxInfo
                  title='Matrícula'
                  className='font-size-sm text-low-dark'
                  valueClassName='d-block'
                >
                  { employee.get('matricula') }
                </TableBoxInfo>
              </TableCardInfo>
              <TableCardInfo noBorder={ true }>
                <TableBoxInfo
                  title='Parcela'
                  className='font-size-sm text-low-dark'
                  valueClassName='d-block'
                >
                  { paymentLot.getFormatedCurrency('valor_previsto') }
                </TableBoxInfo>
              </TableCardInfo>
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
            <TableCardItem noBorder={ true }>
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

EmployeeMobileFieldArray.propTypes = {
  fields: PropTypes.object.isRequired,
  discounts: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

export default EmployeeMobileFieldArray

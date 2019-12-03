import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Search } from '@material-ui/icons'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import SearchFormRender from 'components/SearchFormRender'
import { employeesUpdateFilters, employeesAsyncRequest, employeesUpdatePage } from 'company/actions/employees'
import { employeesListQuery } from 'company/queries/employees'

import ReduxFormInputBuilder from 'components/ReduxFormInput/Builder'
import InputAddonBuilder from 'components/ReduxFormInput/builders/InputAddonBuilder'

const InputAddon = InputAddonBuilder()
  .rightPosition()
  .renderMethod(() => (
    <div className='icon-right-addon'>
      <Search />
    </div>
  ))
  .build()

const ReduxFormInputWithAddon = ReduxFormInputBuilder()
  .rightAddon(InputAddon)
  .disableMargin()
  .build()

const EmployeesSearchForm = ({ handleSubmit, submit }) => {
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    await dispatch(employeesUpdatePage(0))
    await dispatch(employeesUpdateFilters(values.get('search')))
    setTimeout(() => dispatch(employeesAsyncRequest(employeesListQuery)))
  }

  return (
    <SearchFormRender>
      <Form onSubmit={ handleSubmit(onSubmit) }>
        <Field
          type='text'
          name='search'
          id='search'
          placeholder='Buscar por nome, cpf...'
          component={ ReduxFormInputWithAddon }
          onRightAddonClick={ () => submit() }
          noMargin={ true }
        />
      </Form>
    </SearchFormRender>
  )
}

EmployeesSearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'employeesSearchForm',
})(EmployeesSearchForm)

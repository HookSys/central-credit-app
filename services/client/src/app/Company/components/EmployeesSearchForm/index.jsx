import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from '@material-ui/icons'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import SearchFormRender from 'components/SearchFormRender'
import { employeesUpdateFilters, employeesUpdatePage } from 'company/actions/employees'

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

const EmployeesSearchForm = ({ handleSubmit, submit, initialize, requestEmployeesList }) => {
  const dispatch = useDispatch()
  const search = useSelector(({ company }) => company.employees.getIn(['filters', 'search']))

  useEffect(() => {
    if (search) {
      initialize({
        search,
      })
    }
  }, [search])

  const onSubmit = async (values) => {
    await dispatch(employeesUpdatePage(0))
    await dispatch(employeesUpdateFilters(values.get('search')))
    setTimeout(() => requestEmployeesList())
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
  initialize: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  requestEmployeesList: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'employeesSearchForm',
  pure: true,
})(EmployeesSearchForm)

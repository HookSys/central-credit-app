import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from '@material-ui/icons'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import SearchFormRender from 'components/SearchFormRender'
import { companiesUpdateFilters, companiesUpdatePage } from 'admin/actions/companies'

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

const CompaniesSearchForm = ({ handleSubmit, submit, initialize, requestCompaniesList }) => {
  const dispatch = useDispatch()
  const search = useSelector(({ admin }) => admin.companies.getIn(['filters', 'search']))

  useEffect(() => {
    if (search) {
      initialize({
        search
      })
    }
  }, [search])

  const onSubmit = async (values) => {
    await dispatch(companiesUpdatePage(0))
    await dispatch(companiesUpdateFilters(values.get('search')))
    setTimeout(() => requestCompaniesList())
  }

  return (
    <SearchFormRender>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field
          type='text'
          name='search'
          id='search'
          placeholder='Buscar por nome ou código'
          component={ReduxFormInputWithAddon}
          onRightAddonClick={() => submit()}
          noMargin={true}
        />
      </Form>
    </SearchFormRender>
  )
}

CompaniesSearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  requestCompaniesList: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'companiesSearchForm',
  pure: true
})(CompaniesSearchForm)

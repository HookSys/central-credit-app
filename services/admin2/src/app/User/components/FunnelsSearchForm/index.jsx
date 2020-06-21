import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Search } from '@material-ui/icons'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import SearchFormRender from 'components/SearchFormRender'

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

const FunnelsSearchForm = ({ handleSubmit, submit, initialize }) => {
  const search = useSelector(({ seller }) => seller.funnels.getIn(['filters', 'search']))

  useEffect(() => {
    if (search) {
      initialize({
        search
      })
    }
  }, [search])

  const onSubmit = async () => {
  }

  return (
    <SearchFormRender>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field
          type='text'
          name='search'
          id='search'
          placeholder='Buscar por nome, cpf...'
          component={ReduxFormInputWithAddon}
          onRightAddonClick={() => submit()}
          noMargin={true}
        />
      </Form>
    </SearchFormRender>
  )
}

FunnelsSearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'funnelsSearchForm',
  pure: true
})(FunnelsSearchForm)

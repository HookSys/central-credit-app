import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import Layout, { Title, ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import FormContent, { Row, Element } from 'components/FormContent'
import Button from 'components/Button'
import ReduxFormInput from 'components/ReduxFormInput'
import { dateNormalizer } from 'form/normalizers'
import { dateRequired } from 'form/validators'
import { useDispatch } from 'react-redux'
import GenerateFactory from 'factories/Generate'
import ReduxFormCheckbox from 'components/ReduxFormCheckbox'
import { relatoGenerateRequest } from 'core/actions/relato'
import moment from 'moment'

export const formName = 'generateForm'

const Generate = ({ handleSubmit, submit, invalid }) => {
  const dispatch = useDispatch()

  const onSubmit = useCallback(async (values) => {
    const request = GenerateFactory.createRequest(values)
    const database = moment(request.get('database'), 'DD/MM/YYYY')
    dispatch(relatoGenerateRequest(database.toISOString(), request.get('onlyPayments')))
  }, [])

  return (
    <Layout>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Gerar Arquivos</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button onClick={() => submit()} disabled={invalid}>
            Gerar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true} autofocus={true}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent title='Informações'>
            <Row>
              <Element lg='3'>
                <Field
                  type='text'
                  name='database'
                  label='Data: *'
                  id='database'
                  placeholder='Data'
                  component={ReduxFormInput}
                  validate={[dateRequired]}
                  normalize={dateNormalizer}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='auto'>
                <Field
                  name='onlyPayments'
                  label='Não gerar títulos novos, somente os já existentes'
                  id='onlyPayments'
                  component={ReduxFormCheckbox}
                />
              </Element>
            </Row>
          </FormContent>
        </Form>
      </Container>
    </Layout>
  )
}

Generate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: formName
})(Generate)

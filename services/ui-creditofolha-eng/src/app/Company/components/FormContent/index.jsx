import React from 'react'
import PropTypes from 'prop-types'
import { FormSection } from 'redux-form/immutable'

const FormContent = ({ title, children, name }) => {
  return (
    <FormSection name={ name }>
      <div className='mb-3'>
        <h5 className='text-primary'>{ title }</h5>
        { children }
      </div>
    </FormSection>
  )
}

FormContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
}

FormContent.defaultProps = {
  name: '',
}

export { default as Row } from './Row'
export { default as Element } from './Element'

export default FormContent

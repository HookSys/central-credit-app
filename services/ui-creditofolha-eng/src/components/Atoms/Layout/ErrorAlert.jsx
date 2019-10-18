import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

const ErrorAlert = ({ children, className, showChildrenError, showFormErrors }) => {
  const errors = useSelector(state => state.errors.get('alerts'))

  if (!showChildrenError && errors.size === 0) {
    return null
  }

  return (
    <div className='col-12'>
      <div className={ classNames('alert alert-danger', className) } role='alert'>
        { showChildrenError && (
          <div>
            { children }
          </div>
        ) }
        { showFormErrors && errors.size > 0 && (
          <Fragment>
            <h5 className='font-weight-bold mt-1 mb-2'>Atenção:</h5>
            { errors.map((error) => {
              return (
                <span key={ error }>- { error }</span>
              )
            })}
          </Fragment>
        )}
      </div>
    </div>
  )
}
ErrorAlert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  showChildrenError: PropTypes.bool,
  showFormErrors: PropTypes.bool,
}

ErrorAlert.defaultProps = {
  className: '',
  showChildrenError: false,
  showFormErrors: true,
}

export default ErrorAlert

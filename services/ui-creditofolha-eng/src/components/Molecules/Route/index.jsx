import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { MetaTags } from 'components'
import { Route as MainRoute } from 'react-router-dom'
import { compose } from 'recompose'

const Route = ({
  path,
  exact,
  metaTitle,
  metaDescription,
  metaKeywords,
  canonicalPath,
  guards,
  component,
}) => {
  const Component = compose(...guards)(component)
  return (
    <Fragment>
      <MetaTags
        metaTitle={ metaTitle }
        metaDescription={ metaDescription }
        metaKeywords={ metaKeywords }
        canonicalPath={ canonicalPath }
      />
      <MainRoute
        exact={ exact }
        path={ path }
        render={ (props) => <Component { ...props } /> }
      />
    </Fragment>
  )
}

Route.propTypes = {
  exact: PropTypes.bool,
  metaTitle: PropTypes.string,
  metaDescription: PropTypes.string,
  metaKeywords: PropTypes.string,
  canonicalPath: PropTypes.string,
  guards: PropTypes.array,
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}

Route.defaultProps = {
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  canonicalPath: '',
  guards: [],
  exact: false,
}

export default Route

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useEngine } from 'engine'

const getRobotsValue = (shouldBeIndexed) => {
  return shouldBeIndexed ? 'index,follow' : 'noindex,follow'
}

const MetaTags = ({
  metaTitle,
  metaTitleSuffix,
  metaDescription,
  metaKeywords,
  canonicalPath,
  shouldBeIndexed,
}) => {
  const baseUrl = useEngine(({ configs }) => configs.baseUrl)
  return (
    <Helmet>
      <title>{ `${ metaTitle } | ${ metaTitleSuffix } | ONIDATA` }</title>
      <meta name='description' content={ metaDescription } />
      <meta name='keywords' content={ metaKeywords } />
      <link rel='canonical' href={ `${ baseUrl }${ canonicalPath }` } />
      <meta name='robots' content={ getRobotsValue(shouldBeIndexed) } />
    </Helmet>
  )
}

MetaTags.propTypes = {
  metaTitle: PropTypes.string,
  metaTitleSuffix: PropTypes.string,
  metaDescription: PropTypes.string,
  metaKeywords: PropTypes.string,
  canonicalPath: PropTypes.string,
  shouldBeIndexed: PropTypes.bool,
}

MetaTags.defaultProps = {
  metaTitle: '',
  metaTitleSuffix: '',
  metaDescription: '',
  metaKeywords: '',
  canonicalPath: '',
  shouldBeIndexed: true,
}

export default MetaTags

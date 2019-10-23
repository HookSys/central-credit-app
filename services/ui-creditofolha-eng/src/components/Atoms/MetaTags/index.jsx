import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import withEngine from 'engine/withEngine'

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
  theme,
  appThemes: { themes },
  appConfigs: { baseUrl },
}) => {
  return (
    <Helmet>
      <title>{ `${ metaTitle } | ${ metaTitleSuffix } | ONIDATA` }</title>
      <meta name='description' content={ metaDescription } />
      <meta name='keywords' content={ metaKeywords } />
      <link rel='canonical' href={ `${ baseUrl }${ canonicalPath }` } />
      <link rel='stylesheet' href={ themes[theme] } />
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
  theme: PropTypes.string,
  appThemes: PropTypes.object.isRequired,
  appConfigs: PropTypes.object.isRequired,
}

MetaTags.defaultProps = {
  metaTitle: '',
  metaTitleSuffix: '',
  metaDescription: '',
  metaKeywords: '',
  canonicalPath: '',
  theme: 'creditor',
  shouldBeIndexed: true,
}

export default withEngine(MetaTags)

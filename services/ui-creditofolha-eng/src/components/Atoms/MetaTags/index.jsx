import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import withAppEngine from 'engine/withAppEngine'

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
  appThemes,
  appConfigs: { baseUrl },
}) => (
  <Helmet>
    <title>{ `${ metaTitle } | ${ metaTitleSuffix } | ONIDATA` }</title>
    <meta name='description' content={ metaDescription } />
    <meta name='keywords' content={ metaKeywords } />
    <link rel='canonical' href={ `${ baseUrl }${ canonicalPath }` } />
    <link rel='stylesheet' href={ appThemes[theme] } />
    <meta name='robots' content={ getRobotsValue(shouldBeIndexed) } />
  </Helmet>
)

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
  theme: 'default',
  shouldBeIndexed: true,
}

export default withAppEngine(MetaTags)

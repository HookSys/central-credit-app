import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useEngine } from 'engine'

const ThemeRender = ({
  theme,
}) => {
  const themes = useEngine(({ themes }) => themes.themes )
  return (
    <Helmet>
      <link rel='stylesheet' href={ themes[theme] } />
    </Helmet>
  )
}

ThemeRender.propTypes = {
  theme: PropTypes.string,
}

ThemeRender.defaultProps = {
  theme: 'default',
}

export default ThemeRender

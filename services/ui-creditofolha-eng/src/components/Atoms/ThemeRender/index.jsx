import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useEngine } from 'engine'

const ThemeRender = ({ theme }) => {
  const appThemes = useEngine(({ themes }) => themes.themes)
  return (
    <Helmet>
      <link rel='stylesheet' href={ appThemes[theme] } />
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

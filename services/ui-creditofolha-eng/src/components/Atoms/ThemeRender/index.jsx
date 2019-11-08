import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useEngine } from 'engine'
import AppLoader from 'components/AppLoader'

const ThemeRender = ({ theme, children }) => {
  const appThemes = useEngine(({ themes }) => themes.themes)
  const [canRender, toggleCanRender] = useState(false)

  useEffect(() => {
    toggleCanRender(false)
  }, [theme])

  useEffect(() => {
    if (!canRender) {
      setTimeout(() => toggleCanRender(true), 1000)
    }
  }, [canRender])

  return (
    <>
      <Helmet>
        <link rel='stylesheet' href={ appThemes[theme] } />
      </Helmet>
      { children && (canRender ? children : <AppLoader />) }
    </>
  )
}

ThemeRender.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string,
}

ThemeRender.defaultProps = {
  children: null,
  theme: 'default',
}

export default ThemeRender

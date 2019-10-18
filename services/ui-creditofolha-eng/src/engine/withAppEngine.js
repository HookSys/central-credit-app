import React from 'react'
import AppEngine from 'engine'

const withAppEngine = (Component) => (props) => {
  const { structures, themes, service, helpers, configs } = AppEngine
  return (
    <Component
      appStructures={ structures }
      appThemes={ themes }
      appService={ service }
      appHelpers={ helpers }
      appConfigs={ configs }
      { ...props }
    />
  )
}

export default withAppEngine

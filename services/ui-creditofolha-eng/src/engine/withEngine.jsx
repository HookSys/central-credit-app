import React, { useContext } from 'react'
import EngineContext from 'engine/context'

const withEngine = (Component) => (props) => {
  const Engine = useContext(EngineContext)
  const { structures, themes, service, helpers, configs, form, permissions } = Engine
  return (
    <Component
      appStructures={ structures }
      appThemes={ themes }
      appService={ service }
      appHelpers={ helpers }
      appConfigs={ configs }
      appForm={ form }
      appPermissions={ permissions }
      { ...props }
    />
  )
}

export default withEngine

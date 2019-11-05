import React, { useContext } from 'react'
import EngineContext from 'engine/context'

const withEngine = (Component) => (props) => {
  const Engine = useContext(EngineContext)
  const { structures, themes, service, configs, form, permissions } = Engine
  return (
    <Component
      appStructures={ structures }
      appThemes={ themes }
      appService={ service }
      appConfigs={ configs }
      appForm={ form }
      appPermissions={ permissions }
      { ...props }
    />
  )
}

export default withEngine

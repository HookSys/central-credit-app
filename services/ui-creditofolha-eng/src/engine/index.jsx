import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Engine from 'engine/Engine'

import EngineContext from 'engine/context'

const EngineProvider = ({ children }) => {
  const [canRender, setCanRender] = useState(false)
  useEffect(() => {
    async function awaitForEngine() {
      const engine = await Engine.start()
      setCanRender(engine)
      return engine
    }
    awaitForEngine()
  }, [])

  if (canRender) {
    return (
      <EngineContext.Provider value={ Engine }>
        { children(Engine) }
      </EngineContext.Provider>
    )
  }

  return <div> loading </div>
}

EngineProvider.propTypes = {
  children: PropTypes.func.isRequired,
}

export default EngineProvider

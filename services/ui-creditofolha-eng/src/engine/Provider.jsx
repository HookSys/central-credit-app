import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AppLoader from 'components/AppLoader'
import Engine from 'engine/main'
import Context from 'engine/context'

const Provider = ({ children }) => {
  const [canRender, setCanRender] = useState(false)
  useEffect(() => {
    Engine.start().then(() => setCanRender(true))
  }, [])

  if (canRender) {
    return (
      <Context.Provider value={ Engine }>
        { children(Engine) }
      </Context.Provider>
    )
  }

  return <AppLoader />
}

Provider.propTypes = {
  children: PropTypes.func.isRequired,
}

export default Provider

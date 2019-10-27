import React, { useContext } from 'react'
import Context from 'engine/context'

const getDefaultPropsFromEngine = (Engine) => ({
  structures: Engine.structures,
  themes: Engine.themes,
  service: Engine.service,
  helpers: Engine.helpers,
  configs: Engine.configs,
  form: Engine.form,
  permissions: Engine.permissions,
})

function engine(mapEngineToProps) {
  return function wrapWithEngine(WrappedComponent) {
    return (
      <Context.Consumer>
        { value => {
          const componentProps = typeof mapEngineToProps === 'function'
            ? mapEngineToProps(value)
            : getDefaultPropsFromEngine(value)
          return (
            <WrappedComponent { ...componentProps } />
          )
        } }
      </Context.Consumer>
    )
  }
}

export default engine
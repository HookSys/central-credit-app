import { useRef, useContext } from 'react'
import Context from 'engine/context'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useEngine(selector) {
  const engine = useContext(Context)

  const latestSelector = useRef()
  const latestSelectedEngine = useRef()

  let selectedEngine
  try {
    if (selector !== latestSelector.current) {
      selectedEngine = selector(engine)
    } else {
      selectedEngine = latestSelectedEngine.current
    }
  } catch (err) {
    throw new Error(`An error occurred while selecting the engine state: ${ err.message }.`)
  }

  useIsomorphicLayoutEffect(() => {
    latestSelector.current = selector
    latestSelectedEngine.current = selectedEngine
  })

  return selectedEngine
}

export default useEngine

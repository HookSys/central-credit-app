import React, { useState, useRef } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import { debounce } from 'lodash'

const WINDOW_SIZES = {
  XS: (width) => width < 768,
  SM: (width) => width < 992,
  MD: (width) => width < 1200,
  LG: (width) => width >= 1022,
}

function useWindowSize() {
  const [windowSize, updateWindowSize] = useState()
  const latestWindowSize = useRef()

  useIsomorphicLayoutEffect(() => {
    if (latestWindowSize.current !== windowSize) {
      latestWindowSize.current = windowSize
    }
  }, [windowSize])

  useIsomorphicLayoutEffect(() => {
    const onWindowResize = debounce((event) => {
      const width = window.innerWidth
      const sizes = Object.keys(WINDOW_SIZES)
      for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i]
        if (WINDOW_SIZES[size](width)) {
          updateWindowSize(size)
          break
        }
      }
    }, 100, { leading: false, trailing: true })

    onWindowResize()
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  return windowSize
}

export default useWindowSize
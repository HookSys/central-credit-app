import { useRef } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useRightSwipe(callback, elementRef) {
  const startPos = useRef()

  const onTouchEnd = (event) => {
    window.removeEventListener('touchend', onTouchEnd)
    const { clientX, clientY } = event.changedTouches[0]
    const { clientX: startClientX, clientY: startClientY } = startPos.current

    if (Math.abs(clientY - startClientY) < 20 && startClientX !== clientX) {
      event.preventDefault()
      event.stopPropagation()
      if (startClientX <= clientX) {
        callback()
      }
      startPos.current = 0
    }
  }

  const onTouchStart = (event) => {
    const { clientX, clientY } = event.targetTouches[0]
    startPos.current = {
      clientX,
      clientY,
    }
    window.addEventListener('touchend', onTouchEnd)
  }

  useIsomorphicLayoutEffect(() => {
    elementRef.current.addEventListener('touchstart', onTouchStart)
    return () => {
      elementRef.current.removeEventListener('touchstart', onTouchStart)
    }
  }, [callback, elementRef])
}

export default useRightSwipe

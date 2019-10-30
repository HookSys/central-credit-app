import { useRef, useLayoutEffect, useEffect, useContext } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import Context from 'engine/context'

function useNormalizers() {
  const { form: { normalizers } } = useContext(Context)
  return normalizers
}

export default useNormalizers
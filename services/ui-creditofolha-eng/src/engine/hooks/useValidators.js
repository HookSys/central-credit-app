import { useRef, useLayoutEffect, useEffect, useContext } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import Context from 'engine/context'

function useValidators() {
  const { form: { validators } } = useContext(Context)
  return validators
}

export default useValidators
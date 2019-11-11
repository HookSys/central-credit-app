import { useContext } from 'react'
import Context from 'engine/context'

function useValidators() {
  const { form: { validators } } = useContext(Context)
  return validators
}

export default useValidators

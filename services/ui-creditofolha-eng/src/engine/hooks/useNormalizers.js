import { useContext } from 'react'
import Context from 'engine/context'

function useNormalizers() {
  const { form: { normalizers } } = useContext(Context)
  return normalizers
}

export default useNormalizers

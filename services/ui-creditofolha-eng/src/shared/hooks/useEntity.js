import { useContext } from 'react'
import { CoreContext } from 'core'

function useEntity() {
  const { Entity } = useContext(CoreContext)
  return Entity
}

export default useEntity

import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { CoreContext } from 'core'
import { EEntityKeys } from 'constants/entity'

function useStructure() {
  const { Entity } = useContext(CoreContext)
  const selectedEntity = useSelector(({ user }) => user.get('data').getSelectedEntity())

  if (!selectedEntity) {
    return Entity[EEntityKeys.DEFAULT].entity
  }

  return Entity[selectedEntity.get('entidade_tipo')].entity
}

export default useStructure

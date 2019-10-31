import { useContext } from 'react'
import { useSelector } from 'react-redux'
import Context from 'engine/context'

function useStructure() {
  const { structures } = useContext(Context)
  const selectedEntity = useSelector(({ user }) => user.get('data').getSelectedEntity())

  if (!selectedEntity) {
    const { MODULES } = structures
    return structures[MODULES.DEFAULT]
  }

  return structures[selectedEntity.get('entidade_tipo')]
}

export default useStructure
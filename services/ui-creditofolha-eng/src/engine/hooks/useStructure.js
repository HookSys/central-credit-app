import { useContext } from 'react'
import { useSelector } from 'react-redux'
import Context from 'engine/context'

function useStructure() {
  const { structures } = useContext(Context)
  const selectedEntity = useSelector(({ user }) => user.get('data').getSelectedEntity())

  if (!selectedEntity) {
    throw new Error('Non entity was selected yet')
  }

  return structures[selectedEntity.get('entidade_tipo')]
}

export default useStructure
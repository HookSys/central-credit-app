import { useContext } from 'react'
import { AppContext } from 'app'

function usePermissions() {
  const { Permissions } = useContext(AppContext)

  return Permissions
}

export default usePermissions

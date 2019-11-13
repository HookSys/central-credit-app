import { useContext } from 'react'
import { AppContext } from 'app'

function useThemes() {
  const { Themes } = useContext(AppContext)

  return Themes
}

export default useThemes

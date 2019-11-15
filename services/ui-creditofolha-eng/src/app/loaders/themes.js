// @flow
import type { TLoader, TThemesLoader, TCreditoFolha } from 'app/types'
import { ThemesManifestName } from 'configs'

function Themes(): TLoader<TThemesLoader> {
  return {
    load: async () => {
      const { location } = window
      const { Services }: TCreditoFolha = this

      try {
        const response: any = await Services.external({
          method: 'GET',
          path: `${ location.origin }/${ ThemesManifestName }`,
        })

        return response.themes
      } catch (e) {
        throw new Error('Failed to load themes')
      }
    },
  }
}

export default Themes

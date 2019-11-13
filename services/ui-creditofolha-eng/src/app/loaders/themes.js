// @flow
import type { Loader, Themes, AppData } from 'app/types'
import { ThemesManifestName } from 'configs'

function themes(): Loader<Themes> {
  return {
    load: async () => {
      const { location } = window
      const { Services }: AppData = this

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

export default themes

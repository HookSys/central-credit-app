// @flow

import type { Loader } from 'app/types/loader'

type Theme = {
  [string]: string
}

type Themes = Array<Theme>

function themes(): Loader<Themes> {
  return {
    setup: (service, manifestName) => {
      this.service = service
      this.manifestName = manifestName
      return this
    },
    load: async () => {
      try {
        const { location } = window
        const { external } = this.service

        const response: any = await external({
          method: 'GET',
          path: `${ location.origin }/${ this.themesManifestName }`,
        })

        return response.themes
      } catch (e) {
        throw new Error('Failed to load themes')
      }
    },
  }
}

export default themes

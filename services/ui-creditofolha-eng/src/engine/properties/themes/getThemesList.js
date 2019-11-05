export default async function () {
  const { external } = this.service
  const { themesManifestName } = this.configs
  const { location } = window

  try {
    const { themes } = await external({
      method: 'GET',
      path: `${ location.origin }/${ themesManifestName }`,
    })

    return themes
  } catch (e) {
    throw new Error('Failed to load themes')
  }
}

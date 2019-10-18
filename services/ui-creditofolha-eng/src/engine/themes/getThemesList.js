export default async function () {
  const { request } = this.service
  const { themesManifestName } = this.configs
  const { location } = window

  try {
    const { themes } = await request({
      method: 'GET',
      externalPath: `${ location.origin }/${ themesManifestName }`,
    })

    return themes
  } catch (e) {
    console.log('Fail on get themes manifest')
  }

  return null
}

import getThemesList from './getThemesList'

export default async (instance) => {
  const getThemes = getThemesList.bind(instance)
  return {
    getThemesList: getThemes,
    items: await getThemes(),
  }
}

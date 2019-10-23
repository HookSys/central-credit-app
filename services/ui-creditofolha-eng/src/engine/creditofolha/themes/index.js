import getThemesList from './getThemesList'

export default async function () {
  return {
    themes: await getThemesList.apply(this),
  }
}

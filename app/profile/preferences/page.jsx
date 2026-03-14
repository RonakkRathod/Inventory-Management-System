import ProfilePreferencesPage, { profilePreferencesPageData } from '../../../components/profile/profile-preferences-page'
import { fetchBackendResource } from '../../../lib/backend-api'

export default async function ProfilePreferencesRoute() {
  const pageData = await fetchBackendResource('/profile/preferences', profilePreferencesPageData)

  return <ProfilePreferencesPage pageData={pageData} />
}

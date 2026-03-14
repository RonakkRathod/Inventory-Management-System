import ProfileOverviewPage, { profileOverviewPageData } from '../../components/profile/profile-overview-page'
import { fetchBackendResource } from '../../lib/backend-api'

export default async function ProfilePage() {
  const pageData = await fetchBackendResource('/profile', profileOverviewPageData)

  return <ProfileOverviewPage pageData={pageData} />
}

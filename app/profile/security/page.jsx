import ProfileSecurityPage, { profileSecurityPageData } from '../../../components/profile/profile-security-page'
import { fetchBackendResource } from '../../../lib/backend-api'

export default async function ProfileSecurityRoute() {
  const pageData = await fetchBackendResource('/profile/security', profileSecurityPageData)

  return <ProfileSecurityPage pageData={pageData} />
}

import SignupAuthPage, { signupPageData } from '../../components/auth/signup-page'
import { fetchBackendResource } from '../../lib/backend-api'

export default async function SignupPage() {
  const pageData = await fetchBackendResource('/auth/signup', signupPageData)

  return <SignupAuthPage pageData={pageData} />
}
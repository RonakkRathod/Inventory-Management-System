import LoginAuthPage, { loginPageData } from '../../components/auth/login-page'
import { fetchBackendResource } from '../../lib/backend-api'

export default async function LoginPage() {
  const pageData = await fetchBackendResource('/auth/login', loginPageData)

  return <LoginAuthPage pageData={pageData} />
}
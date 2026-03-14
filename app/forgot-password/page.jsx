import ForgotPasswordAuthPage, { forgotPasswordPageData } from '../../components/auth/forgot-password-page'
import { fetchBackendResource } from '../../lib/backend-api'

export default async function ForgotPasswordPage() {
  const pageData = await fetchBackendResource('/auth/forgot-password', forgotPasswordPageData)

  return <ForgotPasswordAuthPage pageData={pageData} />
}
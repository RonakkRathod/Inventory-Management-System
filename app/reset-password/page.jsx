import ResetPasswordAuthPage, { resetPasswordPageData } from '../../components/auth/reset-password-page'
import { fetchBackendResource } from '../../lib/backend-api'

export default async function ResetPasswordPage() {
  const pageData = await fetchBackendResource('/auth/reset-password', resetPasswordPageData)

  return <ResetPasswordAuthPage pageData={pageData} />
}
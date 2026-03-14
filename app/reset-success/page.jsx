import ResetSuccessAuthPage, { resetSuccessPageData } from '../../components/auth/reset-success-page'
import { fetchBackendResource } from '../../lib/backend-api'

export default async function ResetSuccessPage() {
  const pageData = await fetchBackendResource('/auth/reset-success', resetSuccessPageData)

  return <ResetSuccessAuthPage pageData={pageData} />
}
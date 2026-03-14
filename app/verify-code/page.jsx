import VerifyCodeAuthPage, { verifyCodePageData } from '../../components/auth/verify-code-page'
import { fetchBackendResource } from '../../lib/backend-api'

export default async function VerifyCodePage() {
  const pageData = await fetchBackendResource('/auth/verify-code', verifyCodePageData)

  return <VerifyCodeAuthPage pageData={pageData} />
}
import DashboardPage, { dashboardPageData } from '../../components/dashboard/dashboard-page'
import { fetchBackendResource } from '../../lib/backend-api'

export default async function DashboardRoute() {
  const pageData = await fetchBackendResource('/dashboard', dashboardPageData)

  return <DashboardPage data={pageData} />
}

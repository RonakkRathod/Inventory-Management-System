import ProductsDetailsPage, { productsDetailsPageData } from '../../../components/products/products-details-page'
import { fetchBackendResource } from '../../../lib/backend-api'

export default async function ProductsDetailsRoute() {
  const pageData = await fetchBackendResource('/products/details', productsDetailsPageData)

  return <ProductsDetailsPage pageData={pageData} />
}

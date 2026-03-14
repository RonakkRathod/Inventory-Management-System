import ProductsListPage, { productsListPageData } from '../../components/products/products-list-page'
import { fetchBackendResource } from '../../lib/backend-api'

export default async function ProductsPageRoute() {
  const pageData = await fetchBackendResource('/products', productsListPageData)

  return <ProductsListPage pageData={pageData} />
}

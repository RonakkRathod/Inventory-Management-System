import ProductsCreatePage, { productsCreatePageData } from '../../../components/products/products-create-page'
import { fetchBackendResource } from '../../../lib/backend-api'

export default async function ProductsCreateRoute() {
  const pageData = await fetchBackendResource('/products/create', productsCreatePageData)

  return <ProductsCreatePage pageData={pageData} />
}

import ProductsShell from './products-shell'

export const productsCreatePageData = {
  path: '/products/create',
  title: 'Create product',
  description:
    'Product onboarding page aligned with the same design language as dashboard, profile, and auth sections.',
  sectionTitle: 'Create form preview',
  sectionText: 'A backend-ready UI skeleton for creating inventory products.',
  rows: [
    { product: 'Field: Product name', sku: 'Text input', warehouse: 'Required', stock: 'Default 0', status: 'Draft', statusTone: 'warning' },
    { product: 'Field: SKU', sku: 'Unique code', warehouse: 'Validation', stock: 'N/A', status: 'Required', statusTone: 'success' },
    { product: 'Field: Category', sku: 'Dropdown', warehouse: 'Linked', stock: 'N/A', status: 'Optional', statusTone: 'success' },
    { product: 'Field: Reorder level', sku: 'Number', warehouse: 'Per WH', stock: 'Threshold', status: 'Recommended', statusTone: 'warning' },
  ],
  note: 'Use this page to wire create-product API and server validation responses.',
  tips: [
    'Validate SKU uniqueness before final submit.',
    'Allow warehouse-specific opening stock entries.',
    'Redirect to product details after successful creation.',
  ],
}

export default function ProductsCreatePage({ pageData = productsCreatePageData }) {
  return <ProductsShell page={pageData} />
}

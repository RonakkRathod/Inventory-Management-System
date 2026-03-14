import ProductsShell from './products-shell'

const page = {
  path: '/products',
  title: 'Products section',
  description:
    'Manage all products in one place with consistent theme, status visibility, and fast links into create and details flows.',
  sectionTitle: 'Products list',
  sectionText: 'Current tracked products across connected warehouses.',
  rows: [
    { product: 'Industrial Barcode Scanner', sku: 'PRD-1023', warehouse: 'Mumbai Hub', stock: '124', status: 'Active', statusTone: 'success' },
    { product: 'Thermal Label Roll', sku: 'PRD-1188', warehouse: 'Pune Hub', stock: '36', status: 'Low stock', statusTone: 'warning' },
    { product: 'Shelf Bin Medium', sku: 'PRD-2041', warehouse: 'Delhi Hub', stock: '410', status: 'Active', statusTone: 'success' },
    { product: 'Pallet Wrap Film', sku: 'PRD-3105', warehouse: 'Bangalore Hub', stock: '0', status: 'Out of stock', statusTone: 'danger' },
  ],
  note: 'This list is currently UI-only and ready for backend API integration.',
  tips: [
    'Use SKU as the primary key for list/detail routes.',
    'Surface low-stock and out-of-stock states prominently.',
    'Route successful create actions to details with new SKU context.',
  ],
}

export default function ProductsListPage() {
  return <ProductsShell page={page} />
}

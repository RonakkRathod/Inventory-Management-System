import ProductsShell from './products-shell'

const page = {
  path: '/products/details',
  title: 'Product details',
  description:
    'Detailed product view with stock posture and warehouse-level status in the same themed section.',
  sectionTitle: 'Details preview',
  sectionText: 'Representative details layout for a selected product record.',
  rows: [
    { product: 'Industrial Barcode Scanner', sku: 'PRD-1023', warehouse: 'Mumbai Hub', stock: '124', status: 'In stock', statusTone: 'success' },
    { product: 'Last updated', sku: '2026-03-14 09:42', warehouse: 'By Aarav', stock: '-', status: 'Audited', statusTone: 'success' },
    { product: 'Reserved qty', sku: '18', warehouse: 'Open orders', stock: '106 free', status: 'Healthy', statusTone: 'success' },
    { product: 'Reorder point', sku: '40', warehouse: 'Policy CI-PRD-01', stock: '-', status: 'Tracked', statusTone: 'warning' },
  ],
  note: 'Ideal place for stock movement timeline, price bands, and supplier mapping.',
  tips: [
    'Show latest movement history under the details summary.',
    'Highlight stock pressure risks before reorder point is crossed.',
    'Expose edit and deactivate actions with role-based control.',
  ],
}

export default function ProductsDetailsPage() {
  return <ProductsShell page={page} />
}

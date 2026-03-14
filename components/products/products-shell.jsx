import Link from 'next/link'
import { ArrowRight, Boxes, PackagePlus, ScanLine, Warehouse } from 'lucide-react'

const sectionLinks = [
  { href: '/products', label: 'Products list' },
  { href: '/products/create', label: 'Create product' },
  { href: '/products/details', label: 'Product details' },
]

export default function ProductsShell({ page }) {
  return (
    <main className="products-page">
      <section className="products-shell">
        <header className="products-header">
          <div>
            <p className="products-eyebrow">
              <Warehouse size={14} />
              CoreInventory products
            </p>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </div>
          <div className="products-header-actions">
            <Link href="/dashboard" className="products-link products-link--muted">
              Back to dashboard
            </Link>
            <Link href="/login" className="products-link products-link--danger">
              Logout
            </Link>
          </div>
        </header>

        <nav className="products-tabs">
          {sectionLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`products-tab${page.path === item.href ? ' products-tab--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <section className="products-flow">
          <article className="products-flow-card">
            <span className="products-flow-badge products-flow-badge--indigo">Products List</span>
            <ArrowRight size={16} />
            <span className="products-flow-badge products-flow-badge--teal">Create Product</span>
            <ArrowRight size={16} />
            <span className="products-flow-badge products-flow-badge--amber">Product Details</span>
          </article>
        </section>

        <section className="products-grid">
          <article className="products-panel products-panel--wide">
            <div className="products-panel__head">
              <h2>{page.sectionTitle}</h2>
              <p>{page.sectionText}</p>
            </div>

            <div className="products-table-head">
              <span>Product</span>
              <span>SKU</span>
              <span>Warehouse</span>
              <span>Stock</span>
              <span>Status</span>
            </div>

            <div className="products-table-body">
              {page.rows.map((row) => (
                <div key={row.sku} className="products-table-row">
                  <span>{row.product}</span>
                  <span>{row.sku}</span>
                  <span>{row.warehouse}</span>
                  <span>{row.stock}</span>
                  <span className={`products-status products-status--${row.statusTone}`}>{row.status}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="products-panel">
            <div className="products-panel__head">
              <h2>Section actions</h2>
              <p>Quick jumps for list, create, and details pages.</p>
            </div>
            <div className="products-actions">
              <Link href="/products" className="products-action">
                <Boxes size={16} />
                Open products list
              </Link>
              <Link href="/products/create" className="products-action">
                <PackagePlus size={16} />
                Create product
              </Link>
              <Link href="/products/details" className="products-action">
                <ScanLine size={16} />
                Product details
              </Link>
            </div>
          </article>

          <article className="products-panel">
            <div className="products-panel__head">
              <h2>Notes</h2>
              <p>{page.note}</p>
            </div>
            <ul className="products-notes">
              {page.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>
        </section>
      </section>
    </main>
  )
}

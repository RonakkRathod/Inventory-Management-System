"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Boxes, PackagePlus, ScanLine, Warehouse } from 'lucide-react'
import toast from 'react-hot-toast'

const sectionLinks = [
  { href: '/products', label: 'Products list' },
  { href: '/products/create', label: 'Create product' },
  { href: '/products/details', label: 'Product details' },
]

export default function ProductsShell({ page }) {
  const router = useRouter()
  const isCreatePage = page.path === '/products/create'
  const isListPage = page.path === '/products'
  const isDetailsPage = page.path === '/products/details'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [liveRows, setLiveRows] = useState(page.rows || [])

  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? 'http://127.0.0.1:4000/api'

  useEffect(() => {
    const loadLiveRows = async () => {
      if (!isListPage && !isDetailsPage) {
        setLiveRows(page.rows || [])
        return
      }

      try {
        const catalogRes = await fetch(`${backendApiUrl}/products/catalog`, { cache: 'no-store' })
        const catalog = await catalogRes.json().catch(() => [])

        if (!catalogRes.ok || !Array.isArray(catalog) || catalog.length === 0) {
          setLiveRows(page.rows || [])
          return
        }

        if (isListPage) {
          setLiveRows(
            catalog.map((product) => ({
              product: product.name,
              sku: product.sku,
              warehouse: 'Multi-warehouse',
              stock: Number(product.reorderLevel || 0).toString(),
              status: product.isActive ? 'Active' : 'Inactive',
              statusTone: product.isActive ? 'success' : 'danger',
            })),
          )
          return
        }

        const selected = catalog[0]
        const detailsRes = await fetch(`${backendApiUrl}/products/catalog/${selected._id}`, { cache: 'no-store' })
        const details = await detailsRes.json().catch(() => null)

        if (!detailsRes.ok || !details) {
          setLiveRows(page.rows || [])
          return
        }

        const totalStock = Array.isArray(details.stockByWarehouse)
          ? details.stockByWarehouse.reduce((sum, item) => sum + Number(item.onHand || 0), 0)
          : 0

        setLiveRows([
          {
            product: details.name,
            sku: details.sku,
            warehouse: 'All warehouses',
            stock: String(totalStock),
            status: details.isActive ? 'In stock' : 'Inactive',
            statusTone: details.isActive ? 'success' : 'danger',
          },
          {
            product: 'Category',
            sku: details.category || '-',
            warehouse: 'Unit',
            stock: details.unitOfMeasure || 'unit',
            status: 'Tracked',
            statusTone: 'success',
          },
          {
            product: 'Reorder level',
            sku: String(details.reorderLevel || 0),
            warehouse: 'Policy',
            stock: '-',
            status: 'Tracked',
            statusTone: 'warning',
          },
          {
            product: 'Warehouses',
            sku: String((details.stockByWarehouse || []).length),
            warehouse: 'Coverage',
            stock: '-',
            status: 'Synced',
            statusTone: 'success',
          },
        ])
      } catch {
        setLiveRows(page.rows || [])
      }
    }

    loadLiveRows()
  }, [backendApiUrl, isDetailsPage, isListPage, page.rows])

  const handleCreateProduct = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('coreinventory_token')
      if (!token) {
        throw new Error('Please sign in first to create a product.')
      }

      const formData = new FormData(event.currentTarget)
      const payload = {
        name: String(formData.get('name') || '').trim(),
        sku: String(formData.get('sku') || '').trim(),
        category: String(formData.get('category') || '').trim(),
        unitOfMeasure: String(formData.get('unitOfMeasure') || '').trim() || 'unit',
        reorderLevel: Number(formData.get('reorderLevel') || 0),
      }

      const response = await fetch(`${backendApiUrl}/products/catalog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.message || 'Unable to create product.')
      }

      toast.success('Product created successfully.')
      event.currentTarget.reset()
      router.push('/products')
      router.refresh()
    } catch (error) {
      toast.error(error.message || 'Unable to create product.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

            {isCreatePage ? (
              <form className="auth-form" onSubmit={handleCreateProduct}>
                <div className="field-grid">
                  <div className="field">
                    <label htmlFor="product-name">Product name</label>
                    <div className="input-shell">
                      <input id="product-name" name="name" type="text" placeholder="Industrial Barcode Scanner" required />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="product-sku">SKU</label>
                    <div className="input-shell">
                      <input id="product-sku" name="sku" type="text" placeholder="PRD-9001" required />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="product-category">Category</label>
                    <div className="input-shell">
                      <input id="product-category" name="category" type="text" placeholder="Scanning" />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="product-unit">Unit of measure</label>
                    <div className="input-shell">
                      <input id="product-unit" name="unitOfMeasure" type="text" placeholder="unit" />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="product-reorder">Reorder level</label>
                    <div className="input-shell">
                      <input id="product-reorder" name="reorderLevel" type="number" min="0" defaultValue="0" />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="primary-button">
                  {isSubmitting ? 'Creating...' : 'Create product'}
                </button>
              </form>
            ) : null}

            <div className="products-table-head">
              <span>Product</span>
              <span>SKU</span>
              <span>Warehouse</span>
              <span>Stock</span>
              <span>Status</span>
            </div>

            <div className="products-table-body">
              {liveRows.map((row, index) => (
                <div key={`${row.sku}-${index}`} className="products-table-row">
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

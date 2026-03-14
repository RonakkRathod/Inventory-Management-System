const { productPages } = require('../config/page-data')
const Product = require('../models/Product')
const InventoryBalance = require('../models/InventoryBalance')

function getProductsListPage(req, res) {
  return res.status(200).json(productPages.list)
}

function getProductsCreatePage(req, res) {
  return res.status(200).json(productPages.create)
}

function getProductsDetailsPage(req, res) {
  return res.status(200).json(productPages.details)
}

async function listProducts(req, res) {
  const { search, category, warehouseId } = req.query
  const query = { isActive: true }

  if (category) query.category = category
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } },
    ]
  }

  const products = await Product.find(query).sort({ createdAt: -1 }).lean()

  if (!warehouseId) {
    return res.status(200).json(products)
  }

  const balances = await InventoryBalance.find({ warehouse: warehouseId }).lean()
  const stockByProduct = new Map(balances.map((item) => [String(item.product), item.onHand]))

  const withStock = products.map((product) => ({
    ...product,
    warehouseId,
    onHand: stockByProduct.get(String(product._id)) || 0,
  }))

  return res.status(200).json(withStock)
}

async function getProductById(req, res) {
  const product = await Product.findById(req.params.productId)
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' })
  }

  const balances = await InventoryBalance.find({ product: product._id }).populate('warehouse', 'name code location').lean()

  return res.status(200).json({
    ...product.toObject(),
    stockByWarehouse: balances,
  })
}

async function createProduct(req, res) {
  const { name, sku, category, unitOfMeasure, reorderLevel } = req.body

  if (!name || !sku) {
    return res.status(400).json({ message: 'name and sku are required.' })
  }

  const existing = await Product.findOne({ sku: sku.toUpperCase() })
  if (existing) {
    return res.status(409).json({ message: 'SKU already exists.' })
  }

  const product = await Product.create({
    name,
    sku,
    category,
    unitOfMeasure,
    reorderLevel,
  })

  return res.status(201).json(product)
}

async function updateProduct(req, res) {
  const { productId } = req.params
  const update = req.body
  if (update.sku) update.sku = String(update.sku).toUpperCase()

  const product = await Product.findByIdAndUpdate(productId, update, { new: true, runValidators: true })

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' })
  }

  return res.status(200).json(product)
}

module.exports = {
  getProductsListPage,
  getProductsCreatePage,
  getProductsDetailsPage,
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
}
const { dashboardPage } = require('../config/page-data')
const Product = require('../models/Product')
const InventoryBalance = require('../models/InventoryBalance')
const Receipt = require('../models/Receipt')
const DeliveryOrder = require('../models/DeliveryOrder')
const InternalTransfer = require('../models/InternalTransfer')

function buildStatusQuery(status) {
  if (!status) return {}
  return { status: status.toLowerCase() }
}

function buildWarehouseQuery(warehouseId) {
  if (!warehouseId) return {}
  return { warehouse: warehouseId }
}

function getDashboardPage(req, res) {
  return res.status(200).json(dashboardPage)
}

async function getDashboardKpis(req, res) {
  const { status, warehouseId } = req.query

  const productsInStock = await InventoryBalance.aggregate([
    { $match: { onHand: { $gt: 0 } } },
    { $group: { _id: '$product' } },
    { $count: 'count' },
  ])

  const lowStockItems = await InventoryBalance.aggregate([
    { $match: { onHand: { $lte: 10 } } },
    { $count: 'count' },
  ])

  const pendingReceipts = await Receipt.countDocuments({ status: { $in: ['draft', 'waiting', 'ready'] }, ...buildStatusQuery(status), ...buildWarehouseQuery(warehouseId) })
  const pendingDeliveries = await DeliveryOrder.countDocuments({ status: { $in: ['draft', 'waiting', 'ready'] }, ...buildStatusQuery(status), ...buildWarehouseQuery(warehouseId) })
  const scheduledTransfers = await InternalTransfer.countDocuments({ status: { $in: ['draft', 'waiting', 'ready'] }, ...buildStatusQuery(status) })
  const totalProducts = await Product.countDocuments({ isActive: true })

  return res.status(200).json({
    totalProducts,
    totalProductsInStock: productsInStock[0]?.count || 0,
    lowOrOutOfStockItems: lowStockItems[0]?.count || 0,
    pendingReceipts,
    pendingDeliveries,
    internalTransfersScheduled: scheduledTransfers,
    appliedFilters: {
      status: status || null,
      warehouseId: warehouseId || null,
    },
  })
}

module.exports = {
  getDashboardPage,
  getDashboardKpis,
}
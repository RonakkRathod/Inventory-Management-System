const DeliveryOrder = require('../models/DeliveryOrder')
const InternalTransfer = require('../models/InternalTransfer')
const Receipt = require('../models/Receipt')
const StockAdjustment = require('../models/StockAdjustment')
const StockLedger = require('../models/StockLedger')
const { createLedgerEntry, updateInventoryBalance } = require('../services/inventoryService')

function defaultStatus(status) {
  return status || 'draft'
}

async function createReceipt(req, res) {
  const { supplier, warehouse, items, status } = req.body

  const receipt = await Receipt.create({
    supplier,
    warehouse,
    items,
    status: defaultStatus(status),
    createdBy: req.user?._id,
  })

  return res.status(201).json(receipt)
}

async function listReceipts(req, res) {
  const receipts = await Receipt.find().populate('warehouse', 'name code').sort({ createdAt: -1 })
  return res.status(200).json(receipts)
}

async function validateReceipt(req, res) {
  const { receiptId } = req.params
  const receipt = await Receipt.findById(receiptId)
  if (!receipt) return res.status(404).json({ message: 'Receipt not found.' })
  if (receipt.status === 'done') return res.status(400).json({ message: 'Receipt already validated.' })

  for (const item of receipt.items) {
    await updateInventoryBalance({
      productId: item.product,
      warehouseId: receipt.warehouse,
      delta: item.quantity,
    })

    await createLedgerEntry({
      type: 'receipt',
      product: item.product,
      warehouseTo: receipt.warehouse,
      quantity: item.quantity,
      direction: 'in',
      referenceModel: 'Receipt',
      referenceId: receipt._id,
      note: `Receipt validated for supplier ${receipt.supplier}`,
      createdBy: req.user?._id,
    })
  }

  receipt.status = 'done'
  receipt.validatedAt = new Date()
  await receipt.save()

  return res.status(200).json({ message: 'Receipt validated and stock increased.', receipt })
}

async function createDeliveryOrder(req, res) {
  const { customer, warehouse, items, status } = req.body
  const order = await DeliveryOrder.create({
    customer,
    warehouse,
    items,
    status: defaultStatus(status),
    createdBy: req.user?._id,
  })

  return res.status(201).json(order)
}

async function listDeliveryOrders(req, res) {
  const orders = await DeliveryOrder.find().populate('warehouse', 'name code').sort({ createdAt: -1 })
  return res.status(200).json(orders)
}

async function validateDeliveryOrder(req, res) {
  const { orderId } = req.params
  const order = await DeliveryOrder.findById(orderId)
  if (!order) return res.status(404).json({ message: 'Delivery order not found.' })
  if (order.status === 'done') return res.status(400).json({ message: 'Delivery already validated.' })

  for (const item of order.items) {
    await updateInventoryBalance({
      productId: item.product,
      warehouseId: order.warehouse,
      delta: -item.quantity,
    })

    await createLedgerEntry({
      type: 'delivery',
      product: item.product,
      warehouseFrom: order.warehouse,
      quantity: item.quantity,
      direction: 'out',
      referenceModel: 'DeliveryOrder',
      referenceId: order._id,
      note: `Delivery validated for customer ${order.customer}`,
      createdBy: req.user?._id,
    })
  }

  order.status = 'done'
  order.validatedAt = new Date()
  await order.save()

  return res.status(200).json({ message: 'Delivery validated and stock decreased.', order })
}

async function createInternalTransfer(req, res) {
  const { fromWarehouse, toWarehouse, items, status } = req.body
  if (String(fromWarehouse) === String(toWarehouse)) {
    return res.status(400).json({ message: 'fromWarehouse and toWarehouse must be different.' })
  }

  const transfer = await InternalTransfer.create({
    fromWarehouse,
    toWarehouse,
    items,
    status: defaultStatus(status),
    createdBy: req.user?._id,
  })

  return res.status(201).json(transfer)
}

async function listInternalTransfers(req, res) {
  const transfers = await InternalTransfer.find()
    .populate('fromWarehouse', 'name code')
    .populate('toWarehouse', 'name code')
    .sort({ createdAt: -1 })

  return res.status(200).json(transfers)
}

async function validateInternalTransfer(req, res) {
  const { transferId } = req.params
  const transfer = await InternalTransfer.findById(transferId)
  if (!transfer) return res.status(404).json({ message: 'Internal transfer not found.' })
  if (transfer.status === 'done') return res.status(400).json({ message: 'Transfer already validated.' })

  for (const item of transfer.items) {
    await updateInventoryBalance({ productId: item.product, warehouseId: transfer.fromWarehouse, delta: -item.quantity })
    await updateInventoryBalance({ productId: item.product, warehouseId: transfer.toWarehouse, delta: item.quantity })

    await createLedgerEntry({
      type: 'transfer',
      product: item.product,
      warehouseFrom: transfer.fromWarehouse,
      warehouseTo: transfer.toWarehouse,
      quantity: item.quantity,
      direction: 'none',
      referenceModel: 'InternalTransfer',
      referenceId: transfer._id,
      note: 'Internal transfer validated.',
      createdBy: req.user?._id,
    })
  }

  transfer.status = 'done'
  transfer.validatedAt = new Date()
  await transfer.save()

  return res.status(200).json({ message: 'Internal transfer validated.', transfer })
}

async function createStockAdjustment(req, res) {
  const { warehouse, reason, items, status } = req.body

  const normalizedItems = (items || []).map((item) => ({
    ...item,
    difference: Number(item.countedQuantity) - Number(item.recordedQuantity),
  }))

  const adjustment = await StockAdjustment.create({
    warehouse,
    reason,
    items: normalizedItems,
    status: defaultStatus(status),
    createdBy: req.user?._id,
  })

  return res.status(201).json(adjustment)
}

async function listStockAdjustments(req, res) {
  const adjustments = await StockAdjustment.find().populate('warehouse', 'name code').sort({ createdAt: -1 })
  return res.status(200).json(adjustments)
}

async function validateStockAdjustment(req, res) {
  const { adjustmentId } = req.params
  const adjustment = await StockAdjustment.findById(adjustmentId)
  if (!adjustment) return res.status(404).json({ message: 'Stock adjustment not found.' })
  if (adjustment.status === 'done') return res.status(400).json({ message: 'Adjustment already validated.' })

  for (const item of adjustment.items) {
    await updateInventoryBalance({
      productId: item.product,
      warehouseId: adjustment.warehouse,
      delta: item.difference,
    })

    await createLedgerEntry({
      type: 'adjustment',
      product: item.product,
      warehouseTo: adjustment.warehouse,
      quantity: Math.abs(item.difference),
      direction: item.difference >= 0 ? 'in' : 'out',
      referenceModel: 'StockAdjustment',
      referenceId: adjustment._id,
      note: adjustment.reason || 'Stock adjustment validated.',
      createdBy: req.user?._id,
    })
  }

  adjustment.status = 'done'
  adjustment.validatedAt = new Date()
  await adjustment.save()

  return res.status(200).json({ message: 'Stock adjustment validated.', adjustment })
}

async function listMoveHistory(req, res) {
  const { type, productId } = req.query
  const query = {}
  if (type) query.type = type
  if (productId) query.product = productId

  const entries = await StockLedger.find(query)
    .populate('product', 'name sku')
    .populate('warehouseFrom', 'name code')
    .populate('warehouseTo', 'name code')
    .sort({ createdAt: -1 })
    .limit(500)

  return res.status(200).json(entries)
}

module.exports = {
  createReceipt,
  listReceipts,
  validateReceipt,
  createDeliveryOrder,
  listDeliveryOrders,
  validateDeliveryOrder,
  createInternalTransfer,
  listInternalTransfers,
  validateInternalTransfer,
  createStockAdjustment,
  listStockAdjustments,
  validateStockAdjustment,
  listMoveHistory,
}

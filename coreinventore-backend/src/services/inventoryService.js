const InventoryBalance = require('../models/InventoryBalance')
const StockLedger = require('../models/StockLedger')

async function updateInventoryBalance({ productId, warehouseId, delta }) {
  const existing = await InventoryBalance.findOne({ product: productId, warehouse: warehouseId })

  if (!existing) {
    if (delta < 0) {
      throw new Error('Insufficient stock for this operation.')
    }

    return InventoryBalance.create({ product: productId, warehouse: warehouseId, onHand: delta })
  }

  const nextOnHand = existing.onHand + delta

  if (nextOnHand < 0) {
    throw new Error('Insufficient stock for this operation.')
  }

  existing.onHand = nextOnHand
  await existing.save()
  return existing
}

async function createLedgerEntry(entry) {
  return StockLedger.create(entry)
}

module.exports = {
  updateInventoryBalance,
  createLedgerEntry,
}

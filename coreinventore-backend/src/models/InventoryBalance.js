const mongoose = require('mongoose')

const inventoryBalanceSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    onHand: { type: Number, default: 0 },
  },
  { timestamps: true },
)

inventoryBalanceSchema.index({ product: 1, warehouse: 1 }, { unique: true })

module.exports = mongoose.model('InventoryBalance', inventoryBalanceSchema)

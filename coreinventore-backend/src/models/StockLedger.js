const mongoose = require('mongoose')

const stockLedgerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['receipt', 'delivery', 'transfer', 'adjustment'],
      required: true,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    warehouseFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    warehouseTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse' },
    quantity: { type: Number, required: true },
    direction: { type: String, enum: ['in', 'out', 'none'], default: 'none' },
    referenceModel: { type: String, required: true },
    referenceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    note: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('StockLedger', stockLedgerSchema)

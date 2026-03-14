const mongoose = require('mongoose')

const adjustmentItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    recordedQuantity: { type: Number, required: true },
    countedQuantity: { type: Number, required: true },
    difference: { type: Number, required: true },
  },
  { _id: false },
)

const stockAdjustmentSchema = new mongoose.Schema(
  {
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    status: {
      type: String,
      enum: ['draft', 'waiting', 'ready', 'done', 'canceled'],
      default: 'draft',
    },
    reason: { type: String, trim: true },
    items: { type: [adjustmentItemSchema], default: [] },
    validatedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('StockAdjustment', stockAdjustmentSchema)

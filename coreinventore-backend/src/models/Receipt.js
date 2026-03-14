const mongoose = require('mongoose')

const receiptItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
)

const receiptSchema = new mongoose.Schema(
  {
    supplier: { type: String, required: true, trim: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    status: {
      type: String,
      enum: ['draft', 'waiting', 'ready', 'done', 'canceled'],
      default: 'draft',
    },
    items: { type: [receiptItemSchema], default: [] },
    validatedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Receipt', receiptSchema)

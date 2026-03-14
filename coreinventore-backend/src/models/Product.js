const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
    category: { type: String, trim: true },
    unitOfMeasure: { type: String, default: 'unit', trim: true },
    reorderLevel: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Product', productSchema)

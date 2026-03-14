const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['inventory_manager', 'warehouse_staff', 'admin'],
      default: 'inventory_manager',
    },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    resetOtpCode: { type: String },
    resetOtpExpiresAt: { type: Date },
    resetOtpPurpose: {
      type: String,
      enum: ['password_reset', 'login'],
    },
    resetOtpVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)

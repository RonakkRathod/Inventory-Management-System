const express = require('express')
const {
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
} = require('../controllers/operationsController')
const { asyncHandler } = require('../utils/async-handler')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

router.get('/receipts', asyncHandler(listReceipts))
router.post('/receipts', requireAuth, asyncHandler(createReceipt))
router.post('/receipts/:receiptId/validate', requireAuth, asyncHandler(validateReceipt))

router.get('/deliveries', asyncHandler(listDeliveryOrders))
router.post('/deliveries', requireAuth, asyncHandler(createDeliveryOrder))
router.post('/deliveries/:orderId/validate', requireAuth, asyncHandler(validateDeliveryOrder))

router.get('/transfers', asyncHandler(listInternalTransfers))
router.post('/transfers', requireAuth, asyncHandler(createInternalTransfer))
router.post('/transfers/:transferId/validate', requireAuth, asyncHandler(validateInternalTransfer))

router.get('/adjustments', asyncHandler(listStockAdjustments))
router.post('/adjustments', requireAuth, asyncHandler(createStockAdjustment))
router.post('/adjustments/:adjustmentId/validate', requireAuth, asyncHandler(validateStockAdjustment))

router.get('/move-history', asyncHandler(listMoveHistory))

module.exports = router

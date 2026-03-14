const express = require('express')
const { createWarehouse, listWarehouses, updateWarehouse } = require('../controllers/settingsController')
const { asyncHandler } = require('../utils/async-handler')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

router.get('/warehouses', asyncHandler(listWarehouses))
router.post('/warehouses', requireAuth, asyncHandler(createWarehouse))
router.patch('/warehouses/:warehouseId', requireAuth, asyncHandler(updateWarehouse))

module.exports = router

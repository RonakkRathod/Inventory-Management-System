const express = require('express')
const { getDashboardPage, getDashboardKpis } = require('../controllers/dashboardController')
const { asyncHandler } = require('../utils/async-handler')

const router = express.Router()

router.get('/', getDashboardPage)
router.get('/kpis', asyncHandler(getDashboardKpis))

module.exports = router
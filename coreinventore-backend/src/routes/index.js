const express = require('express')
const authRoutes = require('./authRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const operationsRoutes = require('./operationsRoutes')
const productsRoutes = require('./productsRoutes')
const profileRoutes = require('./profileRoutes')
const settingsRoutes = require('./settingsRoutes')

const router = express.Router()

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'coreinventore-backend' })
})

router.use('/auth', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/products', productsRoutes)
router.use('/operations', operationsRoutes)
router.use('/settings', settingsRoutes)
router.use('/profile', profileRoutes)

module.exports = router
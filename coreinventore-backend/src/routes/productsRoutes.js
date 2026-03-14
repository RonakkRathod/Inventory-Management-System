const express = require('express')
const {
  getProductsListPage,
  getProductsCreatePage,
  getProductsDetailsPage,
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
} = require('../controllers/productsController')
const { asyncHandler } = require('../utils/async-handler')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

router.get('/', getProductsListPage)
router.get('/create', getProductsCreatePage)
router.get('/details', getProductsDetailsPage)

router.get('/catalog', asyncHandler(listProducts))
router.get('/catalog/:productId', asyncHandler(getProductById))
router.post('/catalog', requireAuth, asyncHandler(createProduct))
router.patch('/catalog/:productId', requireAuth, asyncHandler(updateProduct))

module.exports = router
const express = require('express')
const {
  getProfileOverviewPage,
  getProfileSecurityPage,
  getProfilePreferencesPage,
  getMyProfile,
  updateMyProfile,
} = require('../controllers/profileController')
const { asyncHandler } = require('../utils/async-handler')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

router.get('/', getProfileOverviewPage)
router.get('/security', getProfileSecurityPage)
router.get('/preferences', getProfilePreferencesPage)
router.get('/me', requireAuth, asyncHandler(getMyProfile))
router.patch('/me', requireAuth, asyncHandler(updateMyProfile))

module.exports = router
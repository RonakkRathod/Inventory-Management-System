const express = require('express')
const {
  getLoginPage,
  getSignupPage,
  getForgotPasswordPage,
  getVerifyCodePage,
  getResetPasswordPage,
  getResetSuccessPage,
  signup,
  login,
  requestPasswordResetOtp,
  verifyPasswordResetOtp,
  resetPassword,
  logout,
} = require('../controllers/authController')
const { asyncHandler } = require('../utils/async-handler')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

router.get('/login', getLoginPage)
router.get('/signup', getSignupPage)
router.get('/forgot-password', getForgotPasswordPage)
router.get('/verify-code', getVerifyCodePage)
router.get('/reset-password', getResetPasswordPage)
router.get('/reset-success', getResetSuccessPage)

router.post('/signup', asyncHandler(signup))
router.post('/login', asyncHandler(login))
router.post('/request-otp', asyncHandler(requestPasswordResetOtp))
router.post('/verify-otp', asyncHandler(verifyPasswordResetOtp))
router.post('/reset-password', asyncHandler(resetPassword))
router.post('/logout', requireAuth, logout)

module.exports = router
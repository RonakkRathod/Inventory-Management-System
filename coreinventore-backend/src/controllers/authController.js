const { authPages } = require('../config/page-data')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { sendPasswordResetOtpEmail } = require('../services/emailService')
const { compareOtp } = require('../services/otpCompareService')

function normalizeOtpPurpose(value) {
  if (value === 'login') return 'login'
  return 'password_reset'
}

function signToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  )
}

function sendPage(pageKey, res) {
  return res.status(200).json(authPages[pageKey])
}

function getLoginPage(req, res) {
  return sendPage('login', res)
}

function getSignupPage(req, res) {
  return sendPage('signup', res)
}

function getForgotPasswordPage(req, res) {
  return sendPage('forgotPassword', res)
}

function getVerifyCodePage(req, res) {
  return sendPage('verifyCode', res)
}

function getResetPasswordPage(req, res) {
  return sendPage('resetPassword', res)
}

function getResetSuccessPage(req, res) {
  return sendPage('resetSuccess', res)
}

async function signup(req, res) {
  const { firstName, lastName, email, password, role } = req.body

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'firstName, lastName, email, and password are required.' })
  }

  const exists = await User.findOne({ email: email.toLowerCase() })
  if (exists) {
    return res.status(409).json({ message: 'Account already exists for this email.' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    passwordHash,
    role: role || 'inventory_manager',
  })

  const token = signToken(user._id)
  return res.status(201).json({
    message: 'Account created successfully.',
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  })
}

async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required.' })
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user || !user.isActive) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials.' })
  }

  user.lastLoginAt = new Date()
  await user.save()

  const token = signToken(user._id)
  return res.status(200).json({
    message: 'Login successful.',
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  })
}

async function requestPasswordResetOtp(req, res) {
  const { email } = req.body
  const purpose = normalizeOtpPurpose(req.body?.purpose)

  if (!email) {
    return res.status(400).json({ message: 'email is required.' })
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    return res.status(200).json({ message: 'If the account exists, an OTP has been issued.' })
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000))
  const expiresInMinutes = 15

  user.resetOtpCode = otp
  user.resetOtpExpiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000)
  user.resetOtpPurpose = purpose
  user.resetOtpVerified = false
  await user.save()

  let emailDelivery = { sent: false, reason: 'Unknown' }
  try {
    emailDelivery = await sendPasswordResetOtpEmail({
      to: user.email,
      otp,
      expiresInMinutes,
    })
  } catch (error) {
    emailDelivery = {
      sent: false,
      reason: error.message,
    }
  }

  return res.status(200).json({
    message: emailDelivery.sent
      ? 'OTP issued and sent successfully.'
      : 'OTP issued successfully. Email delivery is not active; using development fallback.',
    expiresInMinutes,
    purpose,
    emailDelivery,
    devOtp: process.env.NODE_ENV === 'production' ? undefined : otp,
  })
}

async function verifyPasswordResetOtp(req, res) {
  const { email, otp } = req.body
  const purpose = normalizeOtpPurpose(req.body?.purpose)

  if (!email || !otp) {
    return res.status(400).json({ message: 'email and otp are required.' })
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user || !user.resetOtpCode || !user.resetOtpExpiresAt) {
    return res.status(400).json({ message: 'No active OTP request found.' })
  }

  if (user.resetOtpPurpose !== purpose) {
    return res.status(400).json({ message: 'OTP purpose mismatch. Request a new code.' })
  }

  const otpValidation = compareOtp({
    savedOtp: user.resetOtpCode,
    savedExpiry: user.resetOtpExpiresAt,
    incomingOtp: otp,
  })

  if (!otpValidation.ok) {
    return res.status(400).json({ message: otpValidation.reason })
  }

  if (purpose === 'login') {
    user.lastLoginAt = new Date()
    user.resetOtpCode = undefined
    user.resetOtpExpiresAt = undefined
    user.resetOtpPurpose = undefined
    user.resetOtpVerified = false
    await user.save()

    const token = signToken(user._id)
    return res.status(200).json({
      message: 'OTP verified. Login successful.',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
  }

  user.resetOtpVerified = true
  await user.save()

  return res.status(200).json({ message: 'OTP verified successfully.' })
}

async function resetPassword(req, res) {
  const { email, newPassword } = req.body

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'email and newPassword are required.' })
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user || !user.resetOtpVerified || user.resetOtpPurpose !== 'password_reset') {
    return res.status(400).json({ message: 'OTP verification is required before resetting password.' })
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10)
  user.resetOtpCode = undefined
  user.resetOtpExpiresAt = undefined
  user.resetOtpPurpose = undefined
  user.resetOtpVerified = false
  await user.save()

  return res.status(200).json({ message: 'Password reset successfully.' })
}

function logout(req, res) {
  return res.status(200).json({ message: 'Logged out successfully. Remove token on client.' })
}

module.exports = {
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
}
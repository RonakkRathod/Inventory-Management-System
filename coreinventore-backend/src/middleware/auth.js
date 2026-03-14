const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.userId).select('-passwordHash')

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid session.' })
    }

    req.user = user
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}

module.exports = {
  requireAuth,
}

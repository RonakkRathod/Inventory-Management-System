const { profilePages } = require('../config/page-data')

function getProfileOverviewPage(req, res) {
  return res.status(200).json(profilePages.overview)
}

function getProfileSecurityPage(req, res) {
  return res.status(200).json(profilePages.security)
}

function getProfilePreferencesPage(req, res) {
  return res.status(200).json(profilePages.preferences)
}

function getMyProfile(req, res) {
  return res.status(200).json({
    id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    role: req.user.role,
    lastLoginAt: req.user.lastLoginAt,
    createdAt: req.user.createdAt,
  })
}

async function updateMyProfile(req, res) {
  const allowedUpdates = ['firstName', 'lastName']
  allowedUpdates.forEach((field) => {
    if (typeof req.body[field] !== 'undefined') {
      req.user[field] = req.body[field]
    }
  })

  await req.user.save()

  return res.status(200).json({
    message: 'Profile updated successfully.',
    profile: {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
    },
  })
}

module.exports = {
  getProfileOverviewPage,
  getProfileSecurityPage,
  getProfilePreferencesPage,
  getMyProfile,
  updateMyProfile,
}
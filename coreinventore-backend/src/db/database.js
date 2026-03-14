const mongoose = require('mongoose')

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is required. Add it in coreinventore-backend/.env')
  }

  await mongoose.connect(mongoUri, {
    autoIndex: true,
  })

  console.log('MongoDB connected successfully')
}

module.exports = {
  connectDatabase,
}

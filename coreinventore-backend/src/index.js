require('dotenv').config()

const app = require('./app')
const { connectDatabase } = require('./db/database')

const port = Number(process.env.PORT || 4000)

async function bootstrap() {
  await connectDatabase()

  app.listen(port, () => {
    console.log(`CoreInventore backend listening on port ${port}`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start backend:', error.message)
  process.exit(1)
})
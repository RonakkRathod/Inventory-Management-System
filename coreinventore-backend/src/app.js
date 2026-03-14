const express = require('express')
const cors = require('cors')
const apiRoutes = require('./routes')
const { errorHandler, notFoundHandler } = require('./middleware/error-handler')

const app = express()

app.use(
  cors({
    origin: true,
    credentials: false,
  }),
)
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'CoreInventore backend is running.' })
})

app.use('/api', apiRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
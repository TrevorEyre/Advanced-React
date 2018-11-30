require('dotenv').config({ path: '.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

// TODO: Use Express middleware to handle JWT
// TODO: Use Express middleware to populate current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
}, info => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

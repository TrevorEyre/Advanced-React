// Connects to remote Prisma DB and lets us query it with JavaScript
const { Prisma } = require('prisma-binding')

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false,
})

module.exports = db

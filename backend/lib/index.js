const http = require('http')
const logger = require('./logger')
const express = require('./express')
const onTerminationShutGracefully = require('./shutdown')

function createServer (app) {
  const PORT = process.env.PORT

  if (!PORT) throw Error('PORT has not been provided')

  return http.createServer(app).listen(process.env.PORT)
}

async function start () {
  const app = express.init()

  const server = createServer(app)

  onTerminationShutGracefully(server)

  return `Server started at http://localhost:${process.env.PORT}.`
}

module.exports = { start, logger }

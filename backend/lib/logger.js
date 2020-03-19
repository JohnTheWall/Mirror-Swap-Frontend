const winston = require('winston')

winston.emitErrs = true

const transports = [
  new winston.transports.Console({
    level: process.env.LOG_LEVEL,
    handleExceptions: true,
    json: true,
    colorize: true
  })
]

const logger = new winston.Logger({
  transports,
  exitOnError: false
})

module.exports = logger

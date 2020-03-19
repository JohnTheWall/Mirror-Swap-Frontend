const gracefulShutdown = require('http-graceful-shutdown')

const logger = require('./logger')

async function cleanup () {
  logger.info('Cleaning Up')
}

async function onTerminationShutGracefully (server) {
  gracefulShutdown(server, {
    signals: 'SIGINT SIGTERM SIGHUP',
    timeout: process.env.SHUTDOWN_TIMEOUT,
    onShutdown: cleanup,
    finally: function () {
      logger.info('Server is gracefully terminated')
    }
  })
}

module.exports = onTerminationShutGracefully

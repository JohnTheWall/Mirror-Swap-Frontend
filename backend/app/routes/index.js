const initTokenRoutes = require('./token')

function initRoutes (app) {
  app.use('/tokens', initTokenRoutes())
}

module.exports = initRoutes

const express = require('express')

const TokenController = require('../controllers/token')

function initTokenRoutes () {
  const TokenRouter = express.Router()

  TokenRouter.get('/', TokenController.getERC20Tokens)

  return TokenRouter
}

module.exports = initTokenRoutes

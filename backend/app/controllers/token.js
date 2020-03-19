const Responder = require('../../lib/expressResponder')
const { getTokens } = require('../service/coinmarketCap')

class WalletController {
  static async getERC20Tokens (req, res, schema) {
    const response = await getTokens()
    const getERC20Tokens = response.filter(token => token.platform.symbol === 'ETH')

    const tokens = getERC20Tokens.map(token => ({
      id: token.id,
      name: token.name,
      symbol: token.symbol,
      exchangeRate: token.quote.ETH.price
    }))

    Responder.created(res, tokens)
  }
}

module.exports = WalletController

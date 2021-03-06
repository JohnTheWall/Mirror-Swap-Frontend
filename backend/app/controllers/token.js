const Responder = require('../../lib/expressResponder')
const { getTokens } = require('../service/coinmarketCap')
const { ETH_CURRENCY } = require('../../constants')
const { of } = require('await-of')

class WalletController {
  static async getERC20Tokens (req, res, schema) {
    const [response, error] = await of(getTokens())

    if (error) {
      return Responder.operationFailed(res, { status: 500 })
    }

    const getERC20Tokens = response.filter(token => token.platform.symbol === 'ETH')

    const tokens = getERC20Tokens.map(token => ({
      id: token.id,
      name: token.name,
      symbol: token.symbol,
      exchangeRate: token.quote.ETH.price,
      tokenAddress: token.platform.token_address
    }))

    Responder.success(res, [ETH_CURRENCY, ...tokens])
  }
}

module.exports = WalletController

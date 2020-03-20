const { get } = require('../../lib/request')
const { COIN_MARKETCAP_URL } = require('../../constants')

const coinMarketCapApiKey = process.env.COIN_MARKETCAP_API_KEY

if (!coinMarketCapApiKey) throw Error('CoinMarketCap api key not provided!')

const headers = {
  'X-CMC_PRO_API_KEY': coinMarketCapApiKey
}

const getTokens = async () => {
  const url = `${COIN_MARKETCAP_URL}/v1/cryptocurrency/listings/latest`
  const params = {
    cryptocurrency_type: 'tokens',
    convert: 'ETH'
  }
  const response = await get(url, params, headers)
  return response.data.data
}

module.exports = {
  getTokens
}

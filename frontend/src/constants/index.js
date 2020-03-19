const coinmarketcapHost = 'https://sandbox-api.coinmarketcap.com'

export const fetchCurrencyUrl = `${coinmarketcapHost}/v1/cryptocurrency/listings/latest?cryptocurrency_type=tokens&convert=ETH`
export const fetchExchangeRatesUrl = `${coinmarketcapHost}/v1/public/asset-service/product/currency`


export const NETWORK_CHAIN_ID = {
  1: 'Mainnet',
  2: 'Morden',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Goerli',
  42: 'Kovan',
};

export const CHROME_INSTALLATION = 'https://www.google.com/chrome/browser/desktop/';
export const METAMASK_CHROME_EXTENSION = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';

export const INITIAL_CURRENCY_DATA = [
  {
    "id": 1027,
    "name": "Ethereum",
    "symbol": "ETH",
    "slug": "ethereum",
    "num_market_pairs": 5629,
    "date_added": "2015-08-07T00:00:00.000Z",
    "tags": [
      "mineable"
    ],
    "max_supply": null,
    "circulating_supply": 107537936.374,
    "total_supply": 107537936.374,
    "platform": null,
    "cmc_rank": 2,
    "last_updated": "2019-08-30T18:51:21.000Z",
    "quote": {
      "USD": {
        "price": 168.688633539,
        "volume_24h": 5774323846.44399,
        "percent_change_1h": -0.0330049,
        "percent_change_24h": -0.510765,
        "percent_change_7d": -13.1883,
        "market_cap": 18140427540.533985,
        "last_updated": "2019-08-30T18:51:21.000Z"
      }
    }
  },
  {
    "id": 3957,
    "name": "UNUS SED LEO",
    "symbol": "LEO",
    "slug": "unus-sed-leo",
    "num_market_pairs": 20,
    "date_added": "2019-05-21T00:00:00.000Z",
    "tags": [],
    "max_supply": null,
    "circulating_supply": 999498892.9,
    "total_supply": 999498892.9,
    "platform": {
      "id": 1027,
      "name": "Ethereum",
      "symbol": "ETH",
      "slug": "ethereum",
      "token_address": "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3"
    },
    "cmc_rank": 13,
    "last_updated": "2019-08-30T18:51:20.000Z",
    "quote": {
      "USD": {
        "price": 1.14239644171,
        "volume_24h": 6021873.80354068,
        "percent_change_1h": 0.0012279,
        "percent_change_24h": 0.402786,
        "percent_change_7d": -4.8553,
        "market_cap": 1141823978.7420444,
        "last_updated": "2019-08-30T18:51:20.000Z"
      }
    }
  },
  {
    "id": 1975,
    "name": "Chainlink",
    "symbol": "LINK",
    "slug": "chainlink",
    "num_market_pairs": 87,
    "date_added": "2017-09-20T00:00:00.000Z",
    "tags": [],
    "max_supply": null,
    "circulating_supply": 350000000,
    "total_supply": 1000000000,
    "platform": {
      "id": 1027,
      "name": "Ethereum",
      "symbol": "ETH",
      "slug": "ethereum",
      "token_address": "0x514910771af9ca656af840dff83e8264ecf986ca"
    },
    "cmc_rank": 19,
    "last_updated": "2019-08-30T18:51:08.000Z",
    "quote": {
      "USD": {
        "price": 1.81476268884,
        "volume_24h": 51847622.358668,
        "percent_change_1h": -1.01697,
        "percent_change_24h": 1.66959,
        "percent_change_7d": -19.9727,
        "market_cap": 635166941.094,
        "last_updated": "2019-08-30T18:51:08.000Z"
      }
    }
  }
]

export const EXCHANGE_RATES = [
  {
    "pair": "ETH_USD",
    "rate": 0.8927,
  },
  {
    "pair": "LEO_USD",
    "rate": 4.275,
  },
  {
    "pair": "LINK_USD",
    "rate": 31.84,
    "symbol": "฿"
  }
]
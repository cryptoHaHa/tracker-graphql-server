const { RESTDataSource } = require('apollo-datasource-rest');

class CoinAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.coingecko.com/api/v3/';
  }

  // CoinList Database
  coinReducer(coin) {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      current_price: coin.current_price,
      change_percent_1d: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      ath: coin.ath
    }
  }

  async getCoinList({ currency }) {
    const response = await this.get('coins/markets', {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false
    });

    return Array.isArray(response)
      ? response.map(coin => this.coinReducer(coin)) : [];
  }

  //Single Coin Database
  singleReducer(coin, curr) {
    return {
      id: coin.id,
      name: coin.name,
      image: coin.image.large,
      desc: coin.description.en,
      rank: coin.market_cap_rank,
      data: {
        price: coin.market_data.current_price[curr],
        cap: coin.market_data.market_cap[curr]
      }
    }
  }

  async getSingleCoin({ coinId, currency }) {
    const response = await this.get(`coins/${coinId}`);

    return (response) ?
      this.singleReducer(response, currency) : [];
  }
}

module.exports = CoinAPI;
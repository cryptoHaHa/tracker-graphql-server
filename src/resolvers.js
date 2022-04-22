module.exports = {
  Query: {
    coinList: (_, { currency }, { dataSources }) =>
      dataSources.coinAPI.getCoinList({ currency }),
    singleCoin: (_, { id, currency }, { dataSources }) =>
      dataSources.coinAPI.getSingleCoin({ coinId: id, currency: currency }),
  }
};
const { gql } = require("apollo-server");

const typeDefs = gql`
  # Scheme Content
  type Query {
    coinList(currency: String!): [CoinList!]!
    singleCoin(id: ID!, currency: String!): SingleCoin!
  }

  type CoinList {
    id: ID!
    name: String!
    symbol: String!
    image: String!
    current_price: Float!
    change_percent_1d: Float!
    market_cap: Float!
    ath: Float!
  }

  type SingleCoin {
    id: ID!
    name: String!
    image: String!
    desc: String!
    rank: Int
    data: MarketData!
  }

  type MarketData {
    price: Float!
    cap: Float!
  }
`;

module.exports = typeDefs;
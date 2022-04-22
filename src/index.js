const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const CoinAPI = require('./datasources/coins');

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    coinAPI: new CoinAPI()
  })
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});
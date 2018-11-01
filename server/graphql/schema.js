// Imports: GraphQL
const { ApolloServer } = require("apollo-server-express");

const { TYPEDEFS } = require("./types.js");
const { RESOLVERS } = require("./resolvers.js");
// GraphQL: Schema
const port = process.env.PORT || 4000;
const apolloServer = new ApolloServer({
  typeDefs: TYPEDEFS,
  resolvers: RESOLVERS,
  playground: {
    endpoint: `http://localhost:${port}/graphql`,
    settings: {
      "editor.theme": "light"
    }
  }
});
// Exports
module.exports = { apolloServer };

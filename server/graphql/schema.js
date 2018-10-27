// Imports: GraphQL
const { ApolloServer } = require("apollo-server-express");

const { TYPEDEFS } = require("./types.js");
const { RESOLVERS } = require("./resolvers.js");
// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: TYPEDEFS,
  resolvers: RESOLVERS,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      "editor.theme": "light"
    }
  }
});
// Exports
module.exports = { SERVER };

const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { gql } = require("apollo-server-express");
var app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: { hello: () => "world" }
};

const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      "editor.theme": "light"
    }
  }
});
// Middleware: GraphQL
SERVER.applyMiddleware({
  app
});

const PORT = process.env.PORT || 4000;

// Express: Listener
app.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});

module.exports = { app };

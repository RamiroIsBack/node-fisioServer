// Imports: Axios
const axios = require("axios");
// GraphQL: Resolvers
const RESOLVERS = {
  Query: {
    hello: () => "Hello world!"
  }
};
// Exports
module.exports = () => [RESOLVERS];

// Imports: Axios
const axios = require("axios");
// GraphQL: Resolvers
const RESOLVERS = {
  Query: {
    hello(root, args, context, info) {
      return { name: "Gizmo", id: "caca" };
    }
  }
};
// Exports
module.exports = { RESOLVERS };

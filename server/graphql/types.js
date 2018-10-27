// Imports: GraphQL
const { gql } = require("apollo-server-express");
// GraphQL: TypeDefs
const TYPEDEFS = gql`
  type Gremlin {
    name: String
    id: ID
  }
  type Query {
    hello: Gremlin
  }
`;
// Exports
module.exports = { TYPEDEFS };

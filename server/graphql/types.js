// Imports: GraphQL
const { gql } = require("apollo-server-express");
// GraphQL: TypeDefs
const TYPEDEFS = gql`
  type Query {
    hello: String
  }
`;
// Exports
module.exports = () => [TYPEDEFS];

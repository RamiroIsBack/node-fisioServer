// Imports: GraphQL
const { gql } = require("apollo-server-express");
// GraphQL: TypeDefs
const TYPEDEFS = gql`
  type Img {
    src: String
    alt: String
  }
  type InstalacionesCopy {
    textoLargo: String
    textoCorto: String
    id: ID
    items: [Img]
  }
  type Query {
    instalacionesCopy: InstalacionesCopy
  }
`;
// Exports
module.exports = { TYPEDEFS };

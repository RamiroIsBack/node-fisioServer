// Imports: GraphQL
const { gql } = require("apollo-server-express");
// GraphQL: TypeDefs
const TYPEDEFS = gql`
  type User {
    nombre: String
    password: String
    id: ID
  }

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
  type Mutation {
    login(nombre: String, password: String): User
  }
`;
// Exports
module.exports = { TYPEDEFS };

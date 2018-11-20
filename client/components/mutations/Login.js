import gql from "graphql-tag";

export default gql`
  mutation login($nombre: String, $password: String) {
    login(nombre: $nombre, password: $password) {
      id
      nombre
    }
  }
`;

import gql from "graphql-tag";

export default gql`
  {
    instalacionesCopy {
      textoLargo
      textoCorto
      id
      items {
        alt
      }
    }
  }
`;

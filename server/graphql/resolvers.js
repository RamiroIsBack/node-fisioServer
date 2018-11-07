// Imports: Axios
const instalaciones = require("../models/Instalaciones");
// GraphQL: Resolvers
const RESOLVERS = {
  Query: {
    instalacionesCopy(root, args, context, info) {
      return {
        textoLargo: "Gizmo is a lightfull creature that lives with us human",
        id: "caca",
        textoCorto: "Gizmo caca!",
        items: [
          { src: "lskdfjlksdjf", alt: "alt for first item" },
          { src: "lksjfdsdkfjsldfkjsdlk", alt: "alt for second item" }
        ]
      };
    }
  }
};
// Exports
module.exports = { RESOLVERS };

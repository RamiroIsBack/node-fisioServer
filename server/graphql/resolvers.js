// Imports: Axios
const { Instalaciones } = require("../models/Instalaciones");
// GraphQL: Resolvers
const RESOLVERS = {
  Query: {
    instalacionesCopy(root, args, context, info) {
      return Instalaciones.find().then(instalacionesCopy => {
        return instalacionesCopy[0];
      });
      // return {
      //   textoLargo: "Gizmo is a lightfull creature that lives with us human",
      //   id: "caca",
      //   textoCorto: "Gizmo caca!",
      //   items: [
      //     { src: "lskdfjlksdjf", alt: "alt for first item" },
      //     { src: "lksjfdsdkfjsldfkjsdlk", alt: "alt for second item" }
      //   ]
      // };
    }
  }
};
// Exports
module.exports = { RESOLVERS };

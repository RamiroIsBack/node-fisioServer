import constants from "../constants";
import Firebase from "../utils/firebase";

export default {
  theDude: theMan => {
    return {
      type: constants.THE_DUDE,
      data: theMan
    };
  },
  loginFirebase: firebaseObject => {
    return dispatch => {
      return dispatch(
        Firebase.loginFirebase(firebaseObject, constants.INITIALIZE_FIREBASE)
      );
    };
  },
  subirFoto: (id, archivo) => {
    return dispatch => {
      return dispatch(Firebase.subirFoto(id, archivo, constants.UPLOAD_PIC));
    };
  },

  inicioReceived: inicioCopy => {
    return {
      type: constants.INICIO_RECEIVED,
      data: inicioCopy
    };
  },
  equipoReceived: equipoCopy => {
    return {
      type: constants.EQUIPO_RECEIVED,
      data: equipoCopy
    };
  },
  instalacionesReceived: instalacionesCopy => {
    return {
      type: constants.INSTALACIONES_RECEIVED,
      data: instalacionesCopy
    };
  },
  tarifasReceived: tarifasCopy => {
    return {
      type: constants.TARIFAS_RECEIVED,
      data: tarifasCopy
    };
  },
  serviciosReceived: serviciosCopy => {
    return {
      type: constants.SERVICIOS_RECEIVED,
      data: serviciosCopy
    };
  },
  tecnicasReceived: tecnicasCopy => {
    return {
      type: constants.TECNICAS_RECEIVED,
      data: tecnicasCopy
    };
  },

  contactoReceived: contactoCopy => {
    return {
      type: constants.CONTACTO_RECEIVED,
      data: contactoCopy
    };
  }
};

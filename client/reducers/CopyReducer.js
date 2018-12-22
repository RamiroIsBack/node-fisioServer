import constants from "../constants";

var initialState = {
  pics: {
    picFisio: "",
    picOsteo: "",
    picPodo: "",
    picPilates: ""
  }
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case constants.INITIALIZE_FIREBASE: {
      newState["firebase"] = action.data;
      return newState;
    }
    case constants.UPLOAD_PIC: {
      if (action.data.error) {
        return newState;
      }
      newState.pics[action.params] = action.data;
      return newState;
    }
    case constants.INICIO_RECEIVED: {
      newState["inicioCopy"] = action.data;

      return newState;
    }
    case constants.EQUIPO_RECEIVED: {
      newState["equipoCopy"] = action.data;

      return newState;
    }
    case constants.INSTALACIONES_RECEIVED: {
      newState["instalacionesCopy"] = action.data;
      return newState;
    }
    case constants.TARIFAS_RECEIVED: {
      newState["tarifasCopy"] = action.data;
      return newState;
    }
    case constants.SERVICIOS_RECEIVED: {
      newState["serviciosCopy"] = action.data;
      return newState;
    }
    case constants.CONTACTO_RECEIVED: {
      newState["contactoCopy"] = action.data;
      return newState;
    }

    default:
      return state;
  }
};

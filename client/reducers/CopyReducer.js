import constants from "../constants";

var initialState = { pics: [] };

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
      action.data.items.map(pic => {
        newState.pics[pic.nombre] = "";
      });
      newState.pics["newServicio"] = "";
      return newState;
    }
    case constants.EQUIPO_RECEIVED: {
      newState["equipoCopy"] = action.data;
      action.data.equipo.map(persona => {
        newState.pics[persona.nombre] = "";
        persona.formacion.map(formacion => {
          newState.pics[formacion.centroFormativo] = "";
        });
      });
      return newState;
    }
    case constants.INSTALACIONES_RECEIVED: {
      newState["instalacionesCopy"] = action.data;
      action.data.items.map(item => {
        newState.pics[item.nombre] = "";
      });
      return newState;
    }

    case constants.SERVICIOS_RECEIVED: {
      newState["serviciosCopy"] = action.data;
      action.data.servicios.map(servicio => {
        newState.pics[`servicio${servicio.nombre}`] = "";
      });
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

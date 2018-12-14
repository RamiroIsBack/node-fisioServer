import constants from "../constants";

export default {
  theDude: theMan => {
    return {
      type: constants.THE_DUDE,
      data: theMan
    };
  },
  inicioReceived: inicioCopy => {
    return {
      type: constants.INICIO_RECEIVED,
      data: inicioCopy
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
  contactoReceived: contactoCopy => {
    return {
      type: constants.CONTACTO_RECEIVED,
      data: contactoCopy
    };
  }
};

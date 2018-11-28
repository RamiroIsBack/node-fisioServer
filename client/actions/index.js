import constants from "../constants";

export default {
  toggleMobileTopMenu: open => {
    return {
      type: constants.TOGGLE_MOBILE_TOP_MENU,
      data: open
    };
  },
  isTheDude: theMan => {
    return {
      type: constants.IS_THE_DUDE,
      data: theMan
    };
  },
  cierraCookiesAviso: () => {
    return {
      type: constants.CIERRA_COOKIES_AVISO,
      data: false
    };
  }
};

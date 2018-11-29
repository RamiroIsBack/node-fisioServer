import constants from "../constants";

export default {
  toggleMobileTopMenu: open => {
    return {
      type: constants.TOGGLE_MOBILE_TOP_MENU,
      data: open
    };
  },
  theDude: theMan => {
    return {
      type: constants.THE_DUDE,
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

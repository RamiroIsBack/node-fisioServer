import constants from "../constants";

var initialState = {
  logedIn: false
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case constants.IS_THE_DUDE: {
      newState["logedIn"] = action.data;
      return newState;
    }
    case constants.CIERRA_COOKIES_AVISO:
      newState.showAvisoCookies = action.data;
      return newState;

    default:
      return state;
  }
};

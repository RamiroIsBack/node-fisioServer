import constants from "../constants";

var initialState = {
  dudeObject: null
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case constants.THE_DUDE: {
      newState["dudeObject"] = action.data;
      return newState;
    }
    case constants.CIERRA_COOKIES_AVISO:
      newState.showAvisoCookies = action.data;
      return newState;

    default:
      return state;
  }
};

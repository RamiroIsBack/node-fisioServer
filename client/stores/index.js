import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { UserReducer, CopyReducer } from "../reducers";
import { loadState, saveState } from "../utils/localStorage";

export const giveMeStore = () => {
  const reducers = combineReducers({
    // insert reducers here
    copy: CopyReducer,
    user: UserReducer
  });
  const persistedState = loadState();
  const store = createStore(reducers, persistedState, applyMiddleware(thunk));
  store.subscribe(() => {
    saveState({
      user: store.getState().user
    });
  });
  return store;
};

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history)
  });

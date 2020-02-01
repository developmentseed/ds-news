import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import auth from "./auth/auth.reducer";
import query from "./query/query.reducer";

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    query
  });

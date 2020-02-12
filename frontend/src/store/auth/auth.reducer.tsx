import { combineReducers } from "redux";
import { createReducer, getType } from "typesafe-actions";
import { fetchToken, logout } from "./auth.actions";
import { Async } from "../types";

export type AuthState = Readonly<{
  token: null | Async<string, string>;
}>;
const initialState: AuthState = {
  token: null
};

const tokenReducer = createReducer(initialState.token)
  .handleType(getType(fetchToken.request), (state, action) => ({
    status: "FETCHING",
    data: undefined,
    error: undefined
  }))
  .handleType(getType(fetchToken.success), (state, action) => ({
    status: "SUCCESS",
    data: action.payload,
    error: undefined
  }))
  .handleType(getType(fetchToken.failure), (state, action) => ({
    status: "FAILED",
    data: undefined,
    error: action.payload
  }))
  .handleType(getType(logout), () => null);

// TODO: Handle fetchToken.failure, fetchToken.start

export default combineReducers({
  token: tokenReducer
});

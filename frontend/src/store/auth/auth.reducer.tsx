import { combineReducers } from "redux";
import { createReducer, getType } from "typesafe-actions";
import { fetchToken } from "./auth.actions";

export type AuthState = Readonly<{
  token: string;
}>;
const initialState: AuthState = { token: "" };

const tokenReducer = createReducer(initialState.token).handleType(
  getType(fetchToken.success),
  (state, action) => action.payload
);

export default combineReducers({
  token: tokenReducer
});

import { createAction, createAsyncAction } from "typesafe-actions";

export const fetchToken = createAsyncAction(
  "AUTH/FETCH_TOKEN_REQUEST",
  "AUTH/FETCH_TOKEN_SUCCESS",
  "AUTH/FETCH_TOKEN_FAILURE"
)<string, string, string>();

export const logout = createAction("AUTH/LOGOUT")();

import { createAsyncAction } from "typesafe-actions";

// This should be an async action
export const fetchToken = createAsyncAction(
  "AUTH/FETCH_TOKEN_REQUEST",
  "AUTH/FETCH_TOKEN_SUCCESS",
  "AUTH/FETCH_TOKEN_FAILURE"
)<string, string, string>();

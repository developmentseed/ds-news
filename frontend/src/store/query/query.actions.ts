import { createAction, createAsyncAction } from "typesafe-actions";

export const setSearch = createAction("QUERY/SET_SEARCH")<string>();

export const executeSearch = createAsyncAction(
  "QUERY/SEARCH_REQUEST",
  "QUERY/SEARCH_SUCCESS",
  "QUERY/SEARCH_FAILURE"
)<string, undefined, string>();

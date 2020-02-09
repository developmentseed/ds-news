import { createAction, createAsyncAction } from "typesafe-actions";
import { IssuesSearchResult } from "../../services/Github";
import { QueryState } from "./query.reducer";

export const setQuery = createAction("QUERY/SET")<QueryState["query"]>();
export const setSearchTerm = createAction("QUERY/SET_SEARCH_TERM")<string>();

export const executeSearch = createAsyncAction(
  "QUERY/SEARCH_REQUEST",
  "QUERY/SEARCH_SUCCESS",
  "QUERY/SEARCH_FAILURE"
)<string, IssuesSearchResult, string>();

export const startPolling = createAction("QUERY/START_POLLING")();
export const stopPolling = createAction("QUERY/STOP_POLLING")();
export const setPollingTimer = createAction("QUERY/SET_POLLING_TIMER")<
  number
>();

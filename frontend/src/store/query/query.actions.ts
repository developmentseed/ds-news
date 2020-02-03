import { createAction, createAsyncAction } from "typesafe-actions";
import { IssuesSearchResult } from "../../services/Github";
import { QueryState } from "./query.reducer";

export const setQuery = createAction("QUERY/SET")<QueryState["query"]>();

export const setSearch = createAction("QUERY/SET_SEARCH")<string>();

export const executeSearch = createAsyncAction(
  "QUERY/SEARCH_REQUEST",
  "QUERY/SEARCH_SUCCESS",
  "QUERY/SEARCH_FAILURE"
)<string, IssuesSearchResult, string>();

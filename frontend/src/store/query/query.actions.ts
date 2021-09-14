import { createAction, createAsyncAction } from "typesafe-actions";
import { IssuesSearchResult } from "../../services/Github";
import { QueryState } from "./query.reducer";

export const setQuery = createAction("QUERY/SET")<QueryState["query"]>();
export const setSearchTerm = createAction("QUERY/SET_SEARCH_TERM")<string>();
export const setSort = createAction("QUERY/SET_SORT")<string>();

export const addRepo = createAction("QUERY/REPO_ADD")<string>();
export const rmRepo = createAction("QUERY/REPO_RM")<string>();
export const ignoreRepo = createAction("QUERY/REPO_IGNORE")<string>();
export const unignoreRepo = createAction("QUERY/REPO_UNIGNORE")<string>();

export const addAuthor = createAction("QUERY/AUTHOR_ADD")<string>();
export const rmAuthor = createAction("QUERY/AUTHOR_RM")<string>();
export const setAuthor = createAction("QUERY/AUTHOR_SET")<string>();
export const ignoreAuthor = createAction("QUERY/AUTHOR_IGNORE")<string>();
export const unignoreAuthor = createAction("QUERY/AUTHOR_UNIGNORE")<string>();

export const executeSearch = createAsyncAction(
  "QUERY/SEARCH_REQUEST",
  "QUERY/SEARCH_SUCCESS",
  "QUERY/SEARCH_FAILURE"
)<undefined, IssuesSearchResult, string>();

export const startPolling = createAction("QUERY/START_POLLING")();
export const stopPolling = createAction("QUERY/STOP_POLLING")();
export const setPollingTimer = createAction("QUERY/SET_POLLING_TIMER")<
  number
>();

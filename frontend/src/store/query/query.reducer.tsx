import { combineReducers } from "redux";
import { createReducer, getType } from "typesafe-actions";
import { setSearch, executeSearch } from "./query.actions";
import { Async } from "../types";
import { IssuesSearchResult } from "../../services/Github";

export type QueryState = Readonly<{
  query: {
    search: string;
    [term: string]: string | string[] | number | number[];
  };
  results: null | Async<IssuesSearchResult, string>;
}>;
const initialState: QueryState = {
  query: {
    search: "",
    repo: ["now", "how", "ds-business", "ds-team"].map(
      repo => `developmentseed/${repo}`
    ),
    author: []
  },
  results: null
};

const queryReducer = createReducer(initialState.query).handleType(
  getType(setSearch),
  (state, action) => ({
    ...state,
    search: action.payload
  })
);
const resultsReducer = createReducer(initialState.results)
  .handleType(getType(executeSearch.request), (state, action) => ({
    status: "FETCHING",
    data: undefined,
    error: undefined
  }))
  .handleType(getType(executeSearch.success), (state, action) => ({
    status: "SUCCESS",
    data: action.payload,
    error: undefined
  }))
  .handleType(getType(executeSearch.failure), (state, action) => ({
    status: "FAILED",
    data: undefined,
    error: action.payload
  }));

export default combineReducers({
  query: queryReducer,
  results: resultsReducer
});

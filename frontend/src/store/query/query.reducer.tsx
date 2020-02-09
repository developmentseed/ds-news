import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import {
  setSearchTerm,
  executeSearch,
  setQuery,
  startPolling,
  stopPolling,
  setPollingTimer
} from "./query.actions";
import { Async } from "../types";
import { IssuesSearchResult } from "../../services/Github";

export type QueryState = Readonly<{
  query: {
    search: string;
    repo: string[];
    [term: string]: string | string[] | number | number[];
  };
  results: null | Async<IssuesSearchResult, string>;
  polling: {
    active: boolean;
    count: null | number;
    interval: number;
  };
}>;
const initialState: QueryState = {
  query: {
    search: "",
    repo: [
      "now",
      "how",
      "ds-business",
      "ds-team",
      "operations",
      "ds-realwork",
      "labs"
    ].map(repo => `developmentseed/${repo}`),
    author: []
  },
  results: null,
  polling: {
    active: false,
    count: null,
    interval: 5 * 60
  }
};

const queryReducer = createReducer(initialState.query)
  .handleAction(setSearchTerm, (state, { payload }) => ({
    ...state,
    search: payload
  }))
  .handleAction(setQuery, (state, { payload }) => ({
    ...state,
    ...payload
  }));

const resultsReducer = createReducer(initialState.results)
  .handleAction(executeSearch.request, (state, action) => ({
    status: "FETCHING",
    data: state?.data,
    error: undefined
  }))
  .handleAction(executeSearch.success, (state, { payload }) => ({
    status: "SUCCESS",
    data: payload,
    error: undefined
  }))
  .handleAction(executeSearch.failure, (state, { payload }) => ({
    status: "FAILED",
    data: undefined,
    error: payload
  }));

const pollingReducer = createReducer(initialState.polling)
  .handleAction(startPolling, state => ({
    ...state,
    active: true
  }))
  .handleAction(stopPolling, state => ({
    ...state,
    count: null,
    active: false
  }))
  .handleAction(setPollingTimer, (state, { payload }) => ({
    ...state,
    count: payload
  }));

export default combineReducers({
  query: queryReducer,
  results: resultsReducer,
  polling: pollingReducer
});

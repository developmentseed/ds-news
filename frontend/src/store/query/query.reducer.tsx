import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import {
  setSearchTerm,
  executeSearch,
  startPolling,
  stopPolling,
  setPollingTimer,
  rmRepo,
  addRepo,
  setSort,
  setQuery
} from "./query.actions";
import { Async } from "../types";
import { IssuesSearchResult } from "../../services/Github";
import moment from "moment";

// TODO: Clear query results on logout
export type QueryState = Readonly<{
  query: {
    search: string;
    repo: string[];
    sort: string;
  };
  results: null | (Async<IssuesSearchResult, string> & { asOf: string });
  polling: {
    active: boolean;
    count: null | number;
    interval: number;
  };
}>;
const initialState: QueryState = {
  query: {
    search: "",
    repo: [],
    sort: "created"
  },
  results: null,
  polling: {
    active: true,
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
    ...initialState.query,
    ...payload
  }))
  .handleAction(setSort, (state, { payload }) => ({
    ...state,
    sort: payload
  }))
  .handleAction(addRepo, ({ repo, ...state }, { payload }) => ({
    ...state,
    repo: repo.includes(payload) ? repo : repo.concat(payload)
  }))
  .handleAction(rmRepo, ({ repo, ...state }, { payload }) => ({
    ...state,
    repo: repo.filter(name => name !== payload)
  }));

const resultsReducer = createReducer(initialState.results)
  .handleAction(executeSearch.request, (state, action) => ({
    status: "FETCHING",
    data: state?.data,
    error: undefined,
    asOf: moment().format("LLL")
  }))
  .handleAction(executeSearch.success, (state, { payload }) => ({
    status: "SUCCESS",
    data: payload,
    error: undefined,
    asOf: moment().format("LLL")
  }))
  .handleAction(executeSearch.failure, (state, { payload }) => ({
    status: "FAILED",
    data: undefined,
    error: payload,
    asOf: moment().format("LLL")
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

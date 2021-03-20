import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";
import * as actions from "./query.actions";
import { Async } from "../types";
import { IssuesSearchResult } from "../../services/Github";
import moment from "moment";

// TODO: Clear query results on logout
export type QueryState = Readonly<{
  query: {
    search: string;
    repo: string[];
    author: string[];
    sort: string;
    ignoredRepo: string[];
    ignoredAuthor: string[];
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
    author: [],
    sort: "created",
    ignoredRepo: [],
    ignoredAuthor: []
  },
  results: null,
  polling: {
    active: true,
    count: null,
    interval: 5 * 60
  }
};

const queryReducer = createReducer(initialState.query)
  .handleAction(actions.setSearchTerm, (state, { payload }) => ({
    ...state,
    search: payload
  }))
  .handleAction(actions.setQuery, (state, { payload }) => ({
    ...initialState.query,
    ...payload
  }))
  .handleAction(actions.setSort, (state, { payload }) => ({
    ...state,
    sort: payload
  }))
  .handleAction(actions.addRepo, ({ repo, ...state }, { payload }) => ({
    ...state,
    repo: repo.includes(payload) ? repo : repo.concat(payload)
  }))
  .handleAction(actions.rmRepo, ({ repo, ...state }, { payload }) => ({
    ...state,
    repo: repo.filter(name => name !== payload)
  }))
  .handleAction(actions.ignoreRepo, (state, { payload }) => ({
    ...state,
    ignoredRepo: state.ignoredRepo.concat(payload)
  }))
  .handleAction(actions.unignoreRepo, (state, { payload }) => ({
    ...state,
    ignoredRepo: state.ignoredRepo.filter(repo => repo !== payload)
  }))
  .handleAction(actions.addAuthor, ({ author, ...state }, { payload }) => ({
    ...state,
    author: author.includes(payload) ? author : author.concat(payload)
  }))
  .handleAction(actions.rmAuthor, ({ author, ...state }, { payload }) => ({
    ...state,
    author: author.filter(name => name !== payload)
  }))
  .handleAction(actions.setAuthor, (state, { payload }) => ({
    ...state,
    author: [payload]
  }))
  .handleAction(actions.ignoreAuthor, (state, { payload }) => ({
    ...state,
    ignoredAuthor: state.ignoredAuthor.concat(payload)
  }))
  .handleAction(actions.unignoreAuthor, (state, { payload }) => ({
    ...state,
    ignoredAuthor: state.ignoredAuthor.filter(author => author !== payload)
  }));

const resultsReducer = createReducer(initialState.results)
  .handleAction(actions.executeSearch.request, (state, action) => ({
    status: "FETCHING",
    data: state?.data,
    error: undefined,
    asOf: moment().format("LLL")
  }))
  .handleAction(actions.executeSearch.success, (state, { payload }) => ({
    status: "SUCCESS",
    data: payload,
    error: undefined,
    asOf: moment().format("LLL")
  }))
  .handleAction(actions.executeSearch.failure, (state, { payload }) => ({
    status: "FAILED",
    data: undefined,
    error: payload,
    asOf: moment().format("LLL")
  }));

const pollingReducer = createReducer(initialState.polling)
  .handleAction(actions.startPolling, state => ({
    ...state,
    active: true
  }))
  .handleAction(actions.stopPolling, state => ({
    ...state,
    count: null,
    active: false
  }))
  .handleAction(actions.setPollingTimer, (state, { payload }) => ({
    ...state,
    count: payload
  }));

export default combineReducers({
  query: queryReducer,
  results: resultsReducer,
  polling: pollingReducer
});

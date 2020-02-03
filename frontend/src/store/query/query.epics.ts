import { LOCATION_CHANGE, replace } from "connected-react-router";
import { ofType } from "redux-observable";
import { REHYDRATE } from "redux-persist";
import { from, of } from "rxjs";
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { RootEpic } from "../types";
import { executeSearch, setQuery, setSearch } from "./query.actions";
import { QueryState } from "./query.reducer";
import { getQueryString } from "./query.selectors";

const queryUpdateActions = [setSearch, setQuery];

/**
 * When our search parameters update, update URL
 */
const setUrl: RootEpic = (action$, state$, { config }) =>
  action$.pipe(
    filter(isActionOf(queryUpdateActions)),
    debounceTime(config.searchDebounceMs),
    map(() => {
      const location = state$.value.router.location;
      const query = state$.value.query.query;
      return replace({
        ...location,
        search: `q=${encodeURIComponent(getQueryString(query))}`
      });
    })
  );

/**
 * When we load application, rehydrate query from URL
 */
const loadFromUrl: RootEpic = (action$, state$, { config }) =>
  action$.pipe(
    ofType(LOCATION_CHANGE),
    filter(({ payload }) => payload.location.pathname === config.paths.search),
    filter(({ payload }) => payload.isFirstRendering),
    map(() =>
      setQuery(
        decodeURIComponent(state$.value.router.location.search.slice(3))
          .split(" ")
          .map(v => v.split(":"))
          .reduce(
            (acc, v) => ({
              ...acc,
              // Anything without : will be a raw search term
              ...(v.length === 1
                ? {
                    search: acc.search ? `${acc.search} ${v[0]}` : v[0]
                  }
                : // Put anything with a : in store under key
                  {
                    [v[0]]: ((acc[v[0]] as string[]) || []).concat(
                      v.slice(1).join(":")
                    )
                  })
            }),
            {} as QueryState["query"]
          )
      )
    )
  );

/**
 * When our search parameters update, trigger a search to Github
 */
const triggerSearchEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    // Any update to query will trigger search
    filter(isActionOf(queryUpdateActions)),
    // Execute search with computed query string
    map(() => executeSearch.request(getQueryString(state$.value.query.query)))
  );

/**
 * Trigger search after rehydration. This is to catch the edge case where
 */
const triggerSearchAfterRehydrate: RootEpic = (action$, state$, { config }) =>
  action$.pipe(
    // Trigger on rehydration event at search URL
    ofType(REHYDRATE),
    filter(() => state$.value.router.location.pathname === config.paths.search),
    // Execute search with computed query string
    map(() => executeSearch.request(getQueryString(state$.value.query.query)))
  );

/**
 * Execute search with Github
 */
const executeSearchEpic: RootEpic = (action$, state$, { github }) =>
  action$.pipe(
    filter(isActionOf(executeSearch.request)),
    filter(() => !!state$.value.auth.token),
    switchMap(({ payload }) =>
      from(
        // TODO: Consider using the ajax tool to enable cancellation
        github.query({ query: payload, token: state$.value.auth.token }).catch()
      ).pipe(
        map(response => executeSearch.success(response)),
        catchError(message => of(executeSearch.failure(message)))
      )
    )
  );

export const epics = [
  setUrl,
  loadFromUrl,
  triggerSearchEpic,
  executeSearchEpic,
  triggerSearchAfterRehydrate
];

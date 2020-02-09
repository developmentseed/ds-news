import { LOCATION_CHANGE, replace } from "connected-react-router";
import { ofType } from "redux-observable";
import { REHYDRATE } from "redux-persist";
import { concat, from, of, timer } from "rxjs";
import {
  catchError,
  debounceTime,
  filter,
  map,
  mergeMap,
  repeat,
  switchMap,
  switchMapTo,
  takeUntil,
  takeWhile
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { fetchToken } from "../auth/auth.actions";
import { RootAction, RootEpic } from "../types";
import {
  executeSearch,
  setPollingTimer,
  setQuery,
  setSearch,
  startPolling,
  stopPolling
} from "./query.actions";
import { getQueryString } from "./query.selectors";
import { getQueryFromUrl } from "./utils";

const queryUpdateActions = [setSearch, setQuery];

/**
 * When our search parameters update, update URL
 */
const setUrl: RootEpic = (action$, state$, { config }) =>
  action$.pipe(
    filter(isActionOf(queryUpdateActions)),
    debounceTime(config.searchDebounceMs), // Without debounce, the app can feel sluggish when each keystroke updates the URL
    map(() =>
      replace({
        ...state$.value.router.location,
        search: `q=${encodeURIComponent(
          getQueryString(state$.value.query.query)
        )}`
      })
    )
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
        getQueryFromUrl(state$.value.router.location.search.slice(3)) // Slice to ignore '?q='
      )
    )
  );

/**
 * Trigger a search to Github in response to particular events
 */
const triggerSearchEpic: RootEpic = (action$, state$, { config }) =>
  action$.pipe(
    // Trigger search on...
    filter((action: RootAction) =>
      [
        // ... any update to query
        isActionOf(queryUpdateActions),
        // ... login
        isActionOf(fetchToken.success),
        // ... when poll counter hits 0
        (action: RootAction) =>
          isActionOf(setPollingTimer)(action) && action.payload === 0
      ].some(check => check(action))
    ),
    // Only if user has an access token
    filter(() => !!state$.value.auth.token),
    // Throttle search executions
    debounceTime(config.searchDebounceMs),
    // Execute search with computed query string
    map(() => executeSearch.request(getQueryString(state$.value.query.query)))
  );

/**
 * When our app first hydrates on load, take action
 */
const rehydrationEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    ofType(REHYDRATE),
    mergeMap(() =>
      concat(
        // Refresh our query results if we are logged in
        of(
          executeSearch.request(getQueryString(state$.value.query.query))
        ).pipe(filter(() => !!state$.value.auth.token)),

        // Start polling if polling is set to active and we are logged in
        of(startPolling()).pipe(
          filter(() => !!state$.value.query.polling.active),
          filter(() => !!state$.value.auth.token)
        )
      )
    )
  );

const pollQuery: RootEpic = (action$, state$) =>
  action$.pipe(
    ofType(startPolling),
    switchMapTo(
      timer(0, 1000).pipe(
        // Compute diff between polling time and current counter value
        map(val => state$.value.query.polling.interval - val),
        takeWhile(val => val >= 0),
        map(setPollingTimer),
        repeat(),
        takeUntil(action$.pipe(ofType(stopPolling)))
      )
    )
  );

/**
 * Execute search with Github
 */
const executeSearchEpic: RootEpic = (action$, state$, { github, ajax }) =>
  action$.pipe(
    filter(isActionOf(executeSearch.request)),
    // switchMap ensures we ignore the results of ongoing search requests
    switchMap(({ payload }) =>
      from(
        // TODO: Consider using the ajax tool to enable cancellation
        github.query({ query: payload, token: state$.value.auth.token })
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
  pollQuery,
  rehydrationEpic
];

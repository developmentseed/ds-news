import { replace } from "connected-react-router";
import { ofType } from "redux-observable";
import { REHYDRATE } from "redux-persist";
import { concat, from, merge, of, timer } from "rxjs";
import {
  catchError,
  debounceTime,
  filter,
  map,
  mergeMapTo,
  pairwise,
  repeat,
  switchMap,
  switchMapTo,
  takeUntil,
  takeWhile
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { fetchToken } from "../auth/auth.actions";
import { RootEpic, RootState } from "../types";
import {
  executeSearch,
  setPollingTimer,
  setQuery,
  startPolling,
  stopPolling
} from "./query.actions";
import { getQueryString } from "./query.selectors";
import { getQueryFromString } from "./utils";

const queryChanged = ([prevState, curState]: [RootState, RootState]) =>
  JSON.stringify(prevState.query.query) !==
  JSON.stringify(curState.query.query);

/**
 * When our search parameters update, update URL
 */
const setUrl: RootEpic = (action$, state$, { config }) =>
  // On query change
  state$.pipe(
    pairwise(),
    filter(queryChanged),
    debounceTime(config.searchDebounceMs), // Without debounce, the app can feel sluggish when each keystroke updates the URL
    map(([_, curState]) => curState.query.query),
    map(query =>
      replace({
        ...state$.value.router.location,
        search: `q=${encodeURIComponent(getQueryString(query))}`
      })
    )
  );

/**
 * When we load application, rehydrate query from URL
 */
const loadFromUrl: RootEpic = (action$, state$) =>
  action$.pipe(
    ofType(REHYDRATE),
    map(() =>
      setQuery(
        getQueryFromString(state$.value.router.location.search.slice(3)) // Slice to ignore '?q='
      )
    )
  );

/**
 * Trigger a search to Github in response to particular events
 */
const triggerSearchEpic: RootEpic = (action$, state$, { config }) =>
  // Trigger search on...
  merge(
    // ... actions where login occurred
    action$.pipe(filter(isActionOf(fetchToken.success))),

    // ... actions where poll counter hits 0
    action$.pipe(
      filter(isActionOf(setPollingTimer)),
      filter(({ payload }) => payload === 0)
    ),

    // ... states where compared to last state query has changed
    state$.pipe(pairwise(), filter(queryChanged))
  ).pipe(
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
    mergeMapTo(
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

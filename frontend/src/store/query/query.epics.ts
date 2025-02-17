import { replace } from "connected-react-router";
import { ofType } from "redux-observable";
import { REHYDRATE } from "redux-persist";
import { from, merge, of, timer } from "rxjs";
import {
  catchError,
  debounceTime,
  filter,
  flatMap,
  map,
  pairwise,
  switchMap,
  switchMapTo,
  takeUntil,
  takeWhile,
} from "rxjs/operators";
import {
  EmptyAction,
  isActionOf,
  PayloadAction,
  RootEpic,
  RootState,
} from "typesafe-actions";
import { fetchToken } from "../auth/auth.actions";
import {
  executeSearch,
  setPollingTimer,
  setQuery,
  startPolling,
  stopPolling,
} from "./query.actions";
import { getQueryString } from "./query.selectors";
import { getQueryFromString } from "./utils";

const DEFAULT_REPOS = [
  "communications",
  "conferences-events",
  "ds-business",
  "ds-devops",
  "ds-handbook",
  "ds-metrics",
  "ds-projectops",
  "ds-realwork",
  "ds-team",
  "growth",
  "how",
  "labs",
  "now",
  "operations",
];
const DEFAULT_QUERY = ['sort:updated', ...DEFAULT_REPOS.map(r => `repo:developmentseed/${r}`)].join(' ');

const queryChanged = ([prevState, curState]: [RootState, RootState]) =>
  JSON.stringify(prevState.query.query) !==
  JSON.stringify(curState.query.query);

/**
 * When our search parameters update, update URL
 */
const setUrl: RootEpic = (action$, state$, { config }) =>
  // On query change
  state$.pipe(
    filter(
      () =>
        state$.value.router.location.pathname ===
        `${config.basePath}${config.paths.feed}`
    ),
    pairwise(),
    filter(queryChanged),
    debounceTime(config.searchDebounceMs), // Without debounce, the app can feel sluggish when each keystroke updates the URL
    map(([_, curState]) => curState.query.query),
    map((query) =>
      replace({
        ...state$.value.router.location,
        search: `q=${encodeURIComponent(getQueryString(query))}`,
      })
    )
  );

/**
 * When we load application, rehydrate query from URL
 */
const loadFromUrl: RootEpic = (action$, state$, { config }) =>
  action$.pipe(
    ofType(REHYDRATE),
    filter(
      () =>
        state$.value.router.location.pathname ===
        `${config.basePath}${config.paths.feed}`
    ),
    map(() =>
      setQuery(
        getQueryFromString(
          // Remove `code` & `state` from URL
          new URLSearchParams(
            state$.value.router.location.search
          ).get('q') || DEFAULT_QUERY
        )
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

    // ... states where compared to last state query has changed
    state$.pipe(pairwise(), filter(queryChanged))
  ).pipe(
    // Only if user has an access token
    filter(() => !!state$.value.auth.token?.data),
    // Throttle search executions
    debounceTime(config.searchDebounceMs),
    // Execute search with computed query string
    map(() => executeSearch.request())
  );

/**
 * When our app first hydrates on load, take action
 */
const rehydrationEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    ofType(REHYDRATE),
    switchMapTo(
      of(
        // Refresh our query results
        executeSearch.request(),
        // Start polling
        startPolling()
      )
    )
  );

const pollQuery: RootEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(startPolling)),

    // if polling is set to active and we are logged in
    filter(() => !!state$.value.query.polling.active),

    // if we are logged in
    filter(() => !!state$.value.auth.token?.data),

    switchMapTo(
      timer(0, 1000).pipe(
        // Compute diff between polling time and current counter value
        map((val) => state$.value.query.polling.interval - val),
        takeWhile((val) => val >= 0),
        flatMap((val) =>
          of(
            ...([] as (EmptyAction<any> | PayloadAction<any, any>)[])
              .concat(setPollingTimer(val))
              // Search when poll counter hits 0
              .concat(val === 0 ? executeSearch.request() : [])
          )
        ),
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
    switchMap(() =>
      state$.value.auth.token?.data
        ? from(
          github.query({
            query: getQueryString(state$.value.query.query),
            token: state$.value.auth.token.data,
          })
        ).pipe(
          flatMap((response) =>
            of(
              // Emit search response
              executeSearch.success(response),
              // Restart polling
              startPolling()
            )
          ),
          catchError((err) =>
            of(
              executeSearch.failure(`Failed to query Github: ${err.message}`)
            )
          )
        )
        : of(executeSearch.failure("You must be logged in to query Github"))
    )
  );

export const epics = [
  setUrl,
  loadFromUrl,
  triggerSearchEpic,
  executeSearchEpic,
  pollQuery,
  rehydrationEpic,
];

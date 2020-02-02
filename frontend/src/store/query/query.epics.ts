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
import { executeSearch, setSearch } from "./query.actions";
import { getQueryString } from "./query.selectors";

/**
 * When our search parameters update, trigger a search to Github
 */
const triggerSearchEpic: RootEpic = (action$, state$, { config }) =>
  action$.pipe(
    // Any update to query will trigger search
    filter(isActionOf(setSearch)), // TODO: Buildout to handle all actions
    // Throttle search requests
    debounceTime(config.searchDebounceMs),
    // Execute search with computed query string
    map(() => executeSearch.request(getQueryString(state$.value.query.query)))
  );

/**
 * Execute search with Github
 */
const executeSearchEpic: RootEpic = (action$, state$, { github }) =>
  action$.pipe(
    filter(isActionOf(executeSearch.request)),
    switchMap(({ payload }) =>
      from(
        github.query({ query: payload, token: state$.value.auth.token }).catch()
      ).pipe(
        map(response => executeSearch.success(response)),
        catchError(message => of(executeSearch.failure(message)))
      )
    )
  );

export const epics = [triggerSearchEpic, executeSearchEpic];

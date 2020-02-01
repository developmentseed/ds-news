import { of } from "rxjs";
import {
  debounceTime,
  delay,
  filter,
  map,
  mapTo,
  switchMap,
  tap
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
const executeSearchEpic: RootEpic = (action$, state$, { config }) =>
  action$.pipe(
    filter(isActionOf(executeSearch.request)),
    switchMap(({ payload }) =>
      of(payload).pipe(
        // TODO: Put GH query logic here
        tap(() => console.log(`Mock query of ${JSON.stringify(payload)}...`)),
        delay(1500),
        tap(() =>
          console.log(`Mock completed query of ${JSON.stringify(payload)}.`)
        ),
        mapTo(executeSearch.success())
      )
    )
  );

export const epics = [triggerSearchEpic, executeSearchEpic];

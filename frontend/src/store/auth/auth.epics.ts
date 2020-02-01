import { push } from "connected-react-router";
import { of } from "rxjs";
import { catchError, filter, map, mapTo, mergeMap } from "rxjs/operators"; // tslint:disable-line
import { isActionOf } from "typesafe-actions";
import { RootEpic } from "../types";
import { fetchToken } from "./auth.actions";

const fetchGithubToken: RootEpic = (action$, state$, { ajax, config }) =>
  action$.pipe(
    filter(isActionOf(fetchToken.request)),
    mergeMap(({ payload }) =>
      ajax
        .post(
          config.api.auth,
          {
            code: payload
          },
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        )
        .pipe(
          map(response => response.response),
          map(({ access_token }: { access_token: string }) =>
            fetchToken.success(access_token)
          ),
          catchError(message => of(fetchToken.failure(message)))
        )
    )
  );

const redirectHomeAfterLogin: RootEpic = action$ =>
  action$.pipe(filter(isActionOf(fetchToken.success)), mapTo(push("/")));

export const epics = [fetchGithubToken, redirectHomeAfterLogin];

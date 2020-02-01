import { of } from "rxjs";
import { catchError, filter, map, mergeMap } from "rxjs/operators"; // tslint:disable-line
import { isActionOf } from "typesafe-actions";
import { RootEpic } from "../types";
import { fetchToken } from "./auth.actions";

const fetchGithubToken: RootEpic = (
  action$,
  state$,
  { github, ajax, config }
) =>
  action$.pipe(
    filter(isActionOf(fetchToken.request)),
    mergeMap(({ payload }) =>
      ajax
        .post(
          "https://github.com/login/oauth/access_token",
          {
            code: payload,
            client_id: config.gh.client_id,
            client_secret: config.gh.client_secret // This is just for dev...
          },
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        )
        .pipe(
          map(response => JSON.parse(response.responseText)),
          map(({ access_token }: { access_token: string }) =>
            fetchToken.success(access_token)
          ),
          catchError(message => of(fetchToken.failure(message)))
        )
    )
  );

export const epics = [fetchGithubToken];

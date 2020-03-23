import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators"; // tslint:disable-line
import { isActionOf, RootEpic } from "typesafe-actions";
import { fetchToken } from "./auth.actions";

const fetchGithubToken: RootEpic = (action$, state$, { ajax, config }) =>
  action$.pipe(
    filter(isActionOf(fetchToken.request)),
    switchMap(({ payload }) =>
      ajax
        .post(
          config.api.auth,
          { code: payload },
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        )
        .pipe(
          map(response => response.response),
          map(response =>
            response.error
              ? fetchToken.failure(
                response.error_description.split("+").join(" ")
              )
              : response.access_token
                ? fetchToken.success(response.access_token)
                : fetchToken.failure("Received invalid access token")
          ),
          catchError(message => of(fetchToken.failure(message)))
        )
    )
  );

export const epics = [fetchGithubToken];

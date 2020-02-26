import {
  CallHistoryMethodAction,
  LocationState,
  Path
} from "connected-react-router";
import { Epic } from "redux-observable";
import { ActionType, PayloadActionCreator, StateType } from "typesafe-actions";
import { rootActions } from "./root-actions";
import { rootReducer } from "./root-reducer";
import { store } from "./store";

// HACK ZONE
// https://github.com/supasate/connected-react-router/issues/286
interface RouterActions {
  push: (
    path: Path,
    state?: LocationState
  ) => CallHistoryMethodAction<[Path, LocationState?]>;
}
interface PersistActions {
  // This doesn't work how we would like, the payload comes through in an epic
  // as a RootAction object
  rehydrate: PayloadActionCreator<REHYDRATE, number>;
}
// END HACK ZONE

declare module "typesafe-actions" {
  /**
   By declaring our app's types into the typesafe-actions module, any tooling
   from typesafe-actions will inherintly be set up for our app's data types.
   */
  export type Store = StateType<typeof store>;

  export type RootState = StateType<ReturnType<typeof rootReducer>>;

  export type RootAction =
    | ActionType<typeof rootActions>
    | ActionType<RouterActions>
    | ActionType<PersistActions>;

  export type RootEpic = Epic<RootAction, RootAction, RootState, Services>;

  interface Types {
    RootAction: RootAction;
  }
}

declare module "connected-react-router" {}

export type Async<Data, Error> =
  | {
      status: "FETCHING";
      data: undefined | Data;
      error: undefined;
    }
  | {
      status: "SUCCESS";
      data: Data;
      error: undefined;
    }
  | {
      status: "FAILED";
      data: undefined;
      error: Error;
    };

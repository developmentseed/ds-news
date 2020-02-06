import { Epic } from "redux-observable";
import { ActionType, StateType } from "typesafe-actions";
import config from "../config";
import { services } from "../services";
import { rootActions } from "./root-actions";
import { rootReducer } from "./root-reducer";
import { store } from "./store";

export type RootStore = StateType<typeof store>;
export type RootAction = ActionType<typeof rootActions> &
  ActionType<typeof RouterActionType>;
export type RootState = StateType<ReturnType<typeof rootReducer>>;
export type EpicDependencies = typeof services & { config: typeof config };
export type RootEpic = Epic<
  RootAction,
  RootAction,
  RootState,
  EpicDependencies
>;

declare module "typesafe-actions" {
  interface Types {
    RootAction: ActionType<typeof rootActions>;
  }
}

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

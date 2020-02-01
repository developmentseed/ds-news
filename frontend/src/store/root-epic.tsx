import { combineEpics } from "redux-observable";
import { epics as authEpics } from "./auth/auth.epics";

export const rootEpic = combineEpics(...authEpics);

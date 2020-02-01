import { combineEpics } from "redux-observable";
import { epics as authEpics } from "./auth/auth.epics";
import { epics as queryEpics } from "./query/query.epics";

export const rootEpic = combineEpics(...authEpics, ...queryEpics);

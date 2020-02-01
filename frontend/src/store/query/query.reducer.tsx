import { combineReducers } from "redux";
import { createReducer, getType } from "typesafe-actions";
import { setSearch } from "./query.actions";

export type QueryState = Readonly<{
  query: {
    search: string;
    [term: string]: string | string[] | number | number[];
  };
}>;
const initialState: QueryState = {
  query: { search: "", repo: ["now", "how"], author: [] }
};

const queryReducer = createReducer(initialState.query).handleType(
  getType(setSearch),
  (state, action) => ({
    ...state,
    search: action.payload
  })
);

export default combineReducers({
  query: queryReducer
});

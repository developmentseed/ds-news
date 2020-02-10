import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import { createBrowserHistory } from "history";
import storage from "redux-persist/lib/storage";

import { routerMiddleware as createRouterMiddleware } from "connected-react-router";

import { composeEnhancers } from "./utils";
import { rootReducer } from "./root-reducer";
import { rootEpic } from "./root-epic";
import { services } from "../services";
import { RootAction, RootState, EpicDependencies } from "./types";
import config from "../config";

// browser history
export const history = createBrowserHistory();

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  EpicDependencies
>({ dependencies: { ...services, config } });

const routerMiddleware = createRouterMiddleware(history);

// configure middlewares
const middlewares = [epicMiddleware, routerMiddleware];

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// Set persistance
const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: ["auth"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

// create store
export const store = createStore(persistedReducer, initialState, enhancer);
export const persistor = persistStore(store);

// connect redux-observables
epicMiddleware.run(rootEpic);

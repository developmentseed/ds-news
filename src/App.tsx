import React from "react";
import { Provider } from "react-redux";
import store, { history } from "./store/store";
import { ConnectedRouter } from "connected-react-router";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <h1>App goes here</h1>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;

import React from "react";
import { Provider } from "react-redux";
import { store, history } from "./store/store";
import { ConnectedRouter } from "connected-react-router";
import { Nav } from "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { Main } from "./views/Main";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router>
          <Nav />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Main} />
          </Switch>

          {/* TODO:
          - add router
          - create /login route to handle oauth redirect
            - fetch & store token
        */}
        </Router>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;

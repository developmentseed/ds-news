import React from "react";
import { Provider } from "react-redux";
import { store, history } from "./store/store";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Login from "./views/Login";
import Feed from "./views/Feed";
import About from "./views/About";
import { persistor } from "./store/store";
import config from "./config";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate persistor={persistor} loading={<p>Loading...</p>}>
          <Router basename={config.basePath}>
            <Nav />
            <div className="container-fluid">
              <Switch>
                <Route path={config.paths.login} component={Login} />
                <Route path={config.paths.about} component={About} />
                <Route path={config.paths.feed} component={Feed} />
              </Switch>
            </div>
          </Router>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;

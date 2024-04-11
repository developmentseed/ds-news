import React from "react";
import { Provider } from "react-redux";
import { store, history } from "./store/store";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";

import Nav from "./components/Nav";
import Feed from "./views/Feed";
import { persistor } from "./store/store";
import config from "./config";
import AuthCheck from "./components/AuthCheck";

const App: React.FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate persistor={persistor} loading={<p>Loading...</p>}>
        <Router basename={config.basePath}>
          <Nav />
          <div className="container-fluid">
            <AuthCheck>
              <Feed />
            </AuthCheck>
          </div>
        </Router>
      </PersistGate>
    </ConnectedRouter>
  </Provider>
);

export default App;

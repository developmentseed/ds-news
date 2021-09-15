import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import qs from "query-string";
import { connect } from "react-redux";
import { RootState } from "typesafe-actions";
import { logout } from "../store/auth/auth.actions";
import { NavLink, useLocation } from "react-router-dom";
import config from "../config";

export const Nav: React.SFC<Props> = ({ isLoggedIn, dispatchLogout }) => {
  const [isDark, setDark] = useState(false);
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(isDark.matches);
    isDark.addEventListener("change", (event: MediaQueryListEvent) => {
      setDark(event.matches);
    });
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  const { search } = useLocation();
  const loginUrl = qs.stringifyUrl({
    url: "https://github.com/login/oauth/authorize",
    query: {
      client_id: config.clientId,
      redirect_uri: `${config.domain}${config.basePath}${config.paths.login}`,
      scope: "repo",
      state: search, // Pass current query params as "state" param
    },
  });
  return (
    <nav id="header" className="navbar">
      <ul>
        <li>
          <img
            className="logo"
            src={`${process.env.PUBLIC_URL}/favicon.png`}
            alt="ds news logo"
          />
          <h1>ds news</h1>
        </li>
        <li>
          <NavLink
            activeClassName="selected"
            exact
            to={`${process.env.PUBLIC_URL}${config.paths.feed}`}
          >
            feed
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            activeClassName="selected"
            exact
            to={`${process.env.PUBLIC_URL}${config.paths.about}`}
          >
            about
          </NavLink>
        </li> */}
      </ul>
      <ul>
        <li>
          {
            <span className="btn btn-sm" onClick={() => setDark(!isDark)}>
              {isDark ? "🌙" : "☀️"}
            </span>
          }
        </li>
        <li>
          {isLoggedIn ? (
            <button onClick={dispatchLogout} className="link-button">
              logout
            </button>
          ) : (
            <a href={loginUrl}>Login with Github</a>
          )}
        </li>
      </ul>
    </nav>
  );
};

interface StateProps {
  isLoggedIn: boolean;
}
interface DispatchProps {
  dispatchLogout: typeof logout;
}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ auth }) => ({
    isLoggedIn: !!auth.token?.data,
  }),
  (dispatch) => bindActionCreators({ dispatchLogout: logout }, dispatch)
)(Nav);

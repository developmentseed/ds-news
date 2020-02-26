import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RootState } from "typesafe-actions";
import { logout } from "../store/auth/auth.actions";
import config from "../config";

export const Nav: React.SFC<Props> = ({ isLoggedIn, dispatchLogout }) => (
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
        <a
          className="selected"
          href={`${process.env.PUBLIC_URL}${config.paths.feed}`}
        >
          feed
        </a>
      </li>
    </ul>
    <ul>
      <li>
        {isLoggedIn ? (
          <button onClick={dispatchLogout} className="link-button">
            logout
          </button>
        ) : (
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.domain}${config.basePath}${config.paths.login}&scope=repo`}
          >
            Login with Github
          </a>
        )}
      </li>
    </ul>
  </nav>
);

interface StateProps {
  isLoggedIn: boolean;
}
interface DispatchProps {
  dispatchLogout: typeof logout;
}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ auth }) => ({ isLoggedIn: !!auth.token?.data }),
  dispatch => bindActionCreators({ dispatchLogout: logout }, dispatch)
)(Nav);

import React from "react";
import { connect } from "react-redux";
import { RootState } from "../store/types";
import { logout } from "../store/auth/auth.actions";
import { bindActionCreators } from "redux";

export const Nav: React.SFC<Props> = ({ isLoggedIn, dispatchLogout }) => (
  <nav className="navbar">
    <ul className="">
      <li>
        <img className="logo" src="/favicon.png" alt="ds news logo" />
        <h1>ds news</h1>
      </li>
      <li>
        <a href="/" className="selected">
          feed
        </a>
      </li>
    </ul>
    <ul className="">
      <li>
        {isLoggedIn ? (
          <button onClick={dispatchLogout} className="link-button">
            logout
          </button>
        ) : (
          <a href="https://github.com/login/oauth/authorize?client_id=3f43f5bebd8452ebf262&redirect_uri=http://localhost:3000/login&scope=repo&state=my+state">
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
  ({ auth }) => ({ isLoggedIn: !!auth.token }),
  dispatch => bindActionCreators({ dispatchLogout: logout }, dispatch)
)(Nav);

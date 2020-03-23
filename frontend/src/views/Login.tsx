import React, { useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import qs from "query-string";
import { RootState } from "typesafe-actions";
import { fetchToken } from "../store/auth/auth.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthState } from "../store/auth/auth.reducer";
import config from "../config";

const Login: React.SFC<Props> = ({ location, dispatchfetchToken, token }) => {
  // Get code from QueryString
  // TODO: Stop using 'query-string', instead get query from router.location.query in redux
  const { code, state = "" } = qs.parse(location.search);
  const authToken = Array.isArray(code) ? code[0] : code;

  // TODO: Mv this logic to Redux Observables
  useEffect(() => {
    if (!authToken) return;
    dispatchfetchToken(authToken);
  }, [authToken, dispatchfetchToken]);

  if (!code) {
    return <p className="error">No code provided. Please login.</p>;
  }
  return token?.status === "FETCHING" ? (
    <p>Fetching auth token...</p>
  ) : token?.status === "FAILED" ? (
    <p className="error">{token.error}</p>
  ) : (
    // TODO: Redirect to URL that contains original query state
    <Redirect
      to={{
        pathname: config.paths.feed,
        search: state as string
      }}
    />
  );
};

interface StateProps {
  token: AuthState["token"];
}
interface DispatchProps {
  dispatchfetchToken: typeof fetchToken.request;
}
interface OwnProps extends RouteComponentProps<{ code: string }> {}
type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ auth }) => ({ token: auth.token }),
  dispatch =>
    bindActionCreators({ dispatchfetchToken: fetchToken.request }, dispatch)
)(Login);

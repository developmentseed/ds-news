import React, { useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import qs from "query-string";
import { fetchToken } from "../store/auth/auth.actions";
import { connect } from "react-redux";
import { RootState } from "../store/types";
import { bindActionCreators } from "redux";

const LoginComponent: React.SFC<Props> = ({
  location,
  dispatchfetchToken,
  token
}) => {
  // Get code from QueryString
  // TODO: Stop using 'query-string', instead get query from router.location.query in redux
  const { code } = qs.parse(location.search);
  const authToken = Array.isArray(code) ? code[0] : code;

  useEffect(() => {
    if (!authToken) return;
    dispatchfetchToken(authToken);
  }, [authToken, dispatchfetchToken]);

  if (!code) {
    return <p className="error">No code provided. Please login.</p>;
  }
  if (token) {
    return <Redirect to="/" />;
  }
  return <p>Fetching auth token... {token}</p>;
};

interface StateProps {
  token: string;
}
interface DispatchProps {
  dispatchfetchToken: typeof fetchToken.request;
}
interface OwnProps extends RouteComponentProps<{ code: string }> {}
type Props = StateProps & DispatchProps & OwnProps;

export const Login = connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ auth }) => ({ token: auth.token }),
  dispatch =>
    bindActionCreators({ dispatchfetchToken: fetchToken.request }, dispatch)
)(LoginComponent);

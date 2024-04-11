import React, { useEffect } from "react";
import qs from "query-string";
import { RootState } from "typesafe-actions";
import { fetchToken } from "../store/auth/auth.actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthState } from "../store/auth/auth.reducer";

const AuthCheck: React.FC<Props> = ({
  dispatchfetchToken,
  token,
  children,
}) => {
  // Get code from QueryString
  // TODO: Stop using 'query-string', instead get query from router.location.query in redux
  const { code } = qs.parse(window.location.search);
  const authCode = Array.isArray(code) ? code[0] : code;

  // TODO: Mv this logic to Redux Observables
  useEffect(() => {
    if (!authCode) return;
    dispatchfetchToken(authCode);
  }, [authCode, dispatchfetchToken]);

  if (code && token?.status === "FETCHING")
    return <p>Fetching auth token...</p>;
  if (token?.status === "FAILED") return <p className="error">{token.error}</p>;
  return (
    // TODO: Redirect to URL that contains original query state
    <>{children}</>
  );
};

interface StateProps {
  token: AuthState["token"];
}
interface DispatchProps {
  dispatchfetchToken: typeof fetchToken.request;
}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ auth }) => ({ token: auth.token }),
  (dispatch) =>
    bindActionCreators({ dispatchfetchToken: fetchToken.request }, dispatch)
)(AuthCheck);

import React from "react";
import { setSearch } from "../store/query/query.actions";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { RootState } from "../store/types";
import { bindActionCreators } from "redux";
import { getQueryString } from "../store/query/query.selectors";

export const MainComponent: React.SFC<Props> = ({
  search,
  outputSearch,
  dispatchSetSearch
}) => (
  <>
    <ul className="articles">
      <li>
        <p>An article</p>
      </li>
      <li>
        <p>Another</p>
      </li>
      <li>
        <p>foo bar</p>
      </li>
      <li>
        <p>asdf</p>
      </li>
      <li>
        <p>reddit.com</p>
      </li>
    </ul>
    <input
      placeholder="Raw Search"
      value={search}
      onChange={(e: React.FormEvent<HTMLInputElement>) =>
        dispatchSetSearch(e.currentTarget.value)
      }
    />
    <pre>
      <code>{outputSearch}</code>
    </pre>
  </>
);
interface StateProps {
  search: string;
  outputSearch: string;
}
interface DispatchProps {
  dispatchSetSearch: typeof setSearch;
}
interface OwnProps extends RouteComponentProps {}
type Props = StateProps & DispatchProps & OwnProps;

export const Main = connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ query: { query } }) => ({
    search: query.search,
    outputSearch: getQueryString(query)
  }),
  dispatch => bindActionCreators({ dispatchSetSearch: setSearch }, dispatch)
)(MainComponent);

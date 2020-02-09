import React from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSearchTerm } from "../../store/query/query.actions";
import { RootState } from "../../store/types";
import Issue from "./Issue";
import Sidebar from "./Sidebar";
import NavFilter from "./NavFilter";

export const Feed: React.SFC<Props> = ({ searchResults, ...props }) => (
  <div className="row no-gutters">
    <div className="col-sm">
      <NavFilter />
      {searchResults?.status === "FETCHING" && "loading..."}
      {searchResults?.data && (
        <ol className="issues">
          {searchResults.data.search.nodes
            ?.filter(node => Object.entries(node).length !== 0)
            .map((node, i) => (
              <Issue key={i} {...node} />
            ))}
        </ol>
      )}
    </div>
    <Sidebar {...props} />
  </div>
);
interface StateProps {
  query: RootState["query"]["query"];
  polling: RootState["query"]["polling"];
  searchResults: RootState["query"]["results"];
}
interface DispatchProps {
  dispatchSetSearchTerm: typeof setSearchTerm;
}
interface OwnProps extends RouteComponentProps {}
type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ query: { query, results, polling } }) => ({
    query,
    polling,
    searchResults: results
  }),
  dispatch =>
    bindActionCreators({ dispatchSetSearchTerm: setSearchTerm }, dispatch)
)(Feed);

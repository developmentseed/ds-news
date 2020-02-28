import React from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setSearchTerm,
  setSort,
  addRepo,
  rmRepo
} from "../../store/query/query.actions";
import Issue from "./Issue";
import Sidebar from "./Sidebar";
import NavFilter from "./NavFilter";
import { getQueryString } from "../../store/query/query.selectors";
import { RootState } from "typesafe-actions";

export const Feed: React.SFC<Props> = ({
  results,
  query,
  polling,
  dispatchSetSort,
  dispatchSetSearchTerm,
  dispatchAddRepo,
  dispatchRmRepo
}) => (
  <div className="row no-gutters">
    <div className="col-sm pr-1">
      <NavFilter
        sort={query.sort}
        setSort={dispatchSetSort}
        searchTerm={query.search}
        setSearchTerm={dispatchSetSearchTerm}
      />
      {results?.status === "FAILED" ? (
        <pre>{results.error}</pre>
      ) : (
        results?.data && (
          <ol className="issues">
            {results.data.search.nodes
              ?.filter(node => Object.entries(node).length !== 0)
              .map((node, i) => (
                <Issue key={i} {...node} />
              ))}
          </ol>
        )
      )}
      <code>{getQueryString(query)}</code>
    </div>
    <Sidebar
      repos={query.repo}
      results={results}
      dispatchAddRepo={dispatchAddRepo}
      dispatchRmRepo={dispatchRmRepo}
      secondsUntilNextPoll={polling.count}
    />
  </div>
);
interface StateProps {
  query: RootState["query"]["query"];
  results: RootState["query"]["results"];
  polling: RootState["query"]["polling"];
}
interface DispatchProps {
  dispatchSetSearchTerm: typeof setSearchTerm;
  dispatchSetSort: typeof setSort;
  dispatchAddRepo: typeof addRepo;
  dispatchRmRepo: typeof rmRepo;
}
interface OwnProps extends RouteComponentProps {}
type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ query: { query, results, polling } }) => ({
    query,
    results,
    polling
  }),
  dispatch =>
    bindActionCreators(
      {
        dispatchSetSearchTerm: setSearchTerm,
        dispatchSetSort: setSort,
        dispatchAddRepo: addRepo,
        dispatchRmRepo: rmRepo
      },
      dispatch
    )
)(Feed);

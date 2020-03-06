import React from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/query/query.actions";
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
  dispatchRmRepo,
  dispatchAddAuthor,
  dispatchRmAuthor
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
      results={results}
      secondsUntilNextPoll={polling.count}
      repos={query.repo}
      dispatchAddRepo={dispatchAddRepo}
      dispatchRmRepo={dispatchRmRepo}
      authors={query.author}
      dispatchAddAuthor={dispatchAddAuthor}
      dispatchRmAuthor={dispatchRmAuthor}
    />
  </div>
);
interface StateProps {
  query: RootState["query"]["query"];
  results: RootState["query"]["results"];
  polling: RootState["query"]["polling"];
}
interface DispatchProps {
  dispatchSetSearchTerm: typeof actions.setSearchTerm;
  dispatchSetSort: typeof actions.setSort;
  dispatchAddRepo: typeof actions.addRepo;
  dispatchRmRepo: typeof actions.rmRepo;
  dispatchAddAuthor: typeof actions.addAuthor;
  dispatchRmAuthor: typeof actions.rmAuthor;
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
        dispatchSetSearchTerm: actions.setSearchTerm,
        dispatchSetSort: actions.setSort,
        dispatchAddRepo: actions.addRepo,
        dispatchRmRepo: actions.rmRepo,
        dispatchAddAuthor: actions.addAuthor,
        dispatchRmAuthor: actions.rmAuthor
      },
      dispatch
    )
)(Feed);

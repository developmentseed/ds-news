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

export const Feed: React.FC<Props> = (props) => (
  <div className="row no-gutters">
    <div className="col-sm pr-1">
      <NavFilter
        sort={props.query.sort}
        setSort={props.dispatchSetSort}
        searchTerm={props.query.search}
        setSearchTerm={props.dispatchSetSearchTerm}
      />
      {props.results?.status === "FAILED" ? (
        <pre>{props.results.error}</pre>
      ) : (
        props.results?.data && (
          <ol className="issues">
            {props.results.data.search.nodes
              ?.filter(node => Object.entries(node).length !== 0)
              .map((node, i) => (
                <Issue key={i} {...node} />
              ))}
          </ol>
        )
      )}
      <code>{getQueryString(props.query)}</code>
    </div>
    <Sidebar
      results={props.results}
      secondsUntilNextPoll={props.polling.count}
      repos={props.query.repo}
      ignoredRepos={props.query.ignoredRepo}
      dispatchAddRepo={props.dispatchAddRepo}
      dispatchRmRepo={props.dispatchRmRepo}
      dispatchIgnoreRepo={props.dispatchIgnoreRepo}
      dispatchUnignoreRepo={props.dispatchUnignoreRepo}
      authors={props.query.author}
      ignoredAuthors={props.query.ignoredAuthor}
      dispatchAddAuthor={props.dispatchAddAuthor}
      dispatchRmAuthor={props.dispatchRmAuthor}
      dispatchIgnoreAuthor={props.dispatchIgnoreAuthor}
      dispatchUnignoreAuthor={props.dispatchUnignoreAuthor}
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
  dispatchIgnoreRepo: typeof actions.ignoreRepo;
  dispatchUnignoreRepo: typeof actions.unignoreRepo;
  dispatchAddAuthor: typeof actions.addAuthor;
  dispatchRmAuthor: typeof actions.rmAuthor;
  dispatchIgnoreAuthor: typeof actions.ignoreAuthor;
  dispatchUnignoreAuthor: typeof actions.unignoreAuthor;
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
        dispatchIgnoreRepo: actions.ignoreRepo,
        dispatchUnignoreRepo: actions.unignoreRepo,
        dispatchAddAuthor: actions.addAuthor,
        dispatchRmAuthor: actions.rmAuthor,
        dispatchIgnoreAuthor: actions.ignoreAuthor,
        dispatchUnignoreAuthor: actions.unignoreAuthor,
      },
      dispatch
    )
)(Feed);

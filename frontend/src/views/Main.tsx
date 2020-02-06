import React from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Emoji } from "emoji-mart";
import moment from "moment";
import { setSearch } from "../store/query/query.actions";
import { RootState } from "../store/types";
import { getQueryString } from "../store/query/query.selectors";

const emojis = {
  CONFUSED: ":confused:",
  EYES: ":eyes:",
  HEART: ":heart:",
  HOORAY: ":tada:",
  LAUGH: ":smile:",
  ROCKET: ":rocket:",
  THUMBS_DOWN: ":-1:",
  THUMBS_UP: ":+1:"
};

export const Main: React.SFC<Props> = ({
  search,
  outputSearch,
  searchResults,
  dispatchSetSearch
}) => (
  <>
    <input
      placeholder="Search"
      value={search}
      style={{ fontFamily: "monospace", width: "100%" }}
      onChange={(e: React.FormEvent<HTMLInputElement>) =>
        dispatchSetSearch(e.currentTarget.value)
      }
    />
    {searchResults?.status === "FETCHING" && "loading..."}
    <pre>
      <code>{outputSearch}</code>
    </pre>
    {searchResults?.data && (
      <ol className="issues">
        {searchResults.data.search.nodes
          ?.filter(node => Object.entries(node).length !== 0)
          .map(
            (
              {
                title,
                number,
                author,
                createdAt,
                closedAt,
                repository,
                reactions,
                ...node
              },
              i
            ) => (
              <li key={i} className={closedAt ? "closed" : ""}>
                <h6 className="mb-0">
                  <a
                    href={`https://github.com/${repository?.owner.login}/${repository?.name}/issues/${number}`}
                  >
                    {title}
                  </a>
                </h6>

                <p>
                  <a
                    href={`https://github.com/${repository?.owner.login}/${repository?.name}/issues/${number}`}
                  >
                    <strong>{repository?.name}</strong>#{number}
                  </a>
                  {" by "}
                  {/* Author */}
                  <a href={`https://github.com/${author?.login}`}>
                    {author?.login}
                  </a>{" "}
                  {/* Created */}
                  <span title={createdAt!}>{moment(createdAt!).fromNow()}</span>
                  {/* Closed */}
                  {closedAt && (
                    <em className="small" title={closedAt!}>
                      {" "}
                      (closed {moment(closedAt).fromNow()})
                    </em>
                  )}
                  {" | "}
                  {/* Reactions */}
                  {reactions?.edges?.length ? (
                    Object.entries(
                      reactions?.edges?.reduce(
                        (acc, edge) => ({
                          ...acc,
                          [edge?.node.content || ""]:
                            (acc[edge?.node.content || ""] || 0) + 1
                        }),
                        {} as Record<string, number>
                      ) || {}
                    ).map(([reaction, count]) => (
                      <span key={reaction} className="mr-1">
                        <Emoji
                          emoji={emojis[reaction as keyof typeof emojis]}
                          size={16}
                          tooltip
                        />
                        {count > 1 && <sup>{count}</sup>}
                      </span>
                    ))
                  ) : (
                    <em className="small">no reactions</em>
                  )}
                  {" | "}
                  {/* <small>{Math.floor(Math.random() * 20)} comments,</small> */}
                  <span className="mr-1">
                    <Emoji emoji={"speech_balloon"} size={16} tooltip />
                    {<sup>{Math.floor(Math.random() * 20)}</sup>}
                  </span>
                </p>

                {Object.entries(node).length ? (
                  <pre>
                    <code>{JSON.stringify(node, null, 2)}</code>
                  </pre>
                ) : (
                  undefined
                )}
              </li>
            )
          )}
      </ol>
    )}
  </>
);
interface StateProps {
  search: string;
  outputSearch: string;
  searchResults: RootState["query"]["results"];
}
interface DispatchProps {
  dispatchSetSearch: typeof setSearch;
}
interface OwnProps extends RouteComponentProps {}
type Props = StateProps & DispatchProps & OwnProps;

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ query: { query, results } }) => ({
    search: query.search,
    outputSearch: getQueryString(query),
    searchResults: results
  }),
  dispatch => bindActionCreators({ dispatchSetSearch: setSearch }, dispatch)
)(Main);

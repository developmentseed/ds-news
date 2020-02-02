import React from "react";
import { setSearch } from "../store/query/query.actions";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { RootState } from "../store/types";
import { bindActionCreators } from "redux";
import { getQueryString } from "../store/query/query.selectors";
import { Emoji } from "emoji-mart";

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

export const MainComponent: React.SFC<Props> = ({
  search,
  outputSearch,
  searchResults,
  dispatchSetSearch
}) => (
  <>
    <input
      placeholder="Raw Search"
      value={search}
      onChange={(e: React.FormEvent<HTMLInputElement>) =>
        dispatchSetSearch(e.currentTarget.value)
      }
    />
    {searchResults?.status === "FETCHING" && "loading..."}
    <pre>
      <code>{outputSearch}</code>
    </pre>
    {searchResults?.data && (
      <ul>
        {searchResults.data.search.edges
          ?.filter(({ node }) => Object.entries(node).length !== 0)
          .map(
            (
              {
                node: {
                  title,
                  number,
                  author,
                  createdAt,
                  closedAt,
                  repository,
                  reactions,
                  ...node
                }
              },
              i
            ) => (
              <li>
                <div>
                  <a
                    href={`https://github.com/${repository?.owner.login}/${repository?.name}/issues/${number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h6>{title}</h6>
                  </a>

                  <p>
                    <a
                      href={`https://github.com/${repository?.owner.login}/${repository?.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill"
                    >
                      {repository?.owner.login}/{repository?.name}
                    </a>{" "}
                    <a
                      href={`https://github.com/${repository?.owner.login}/${repository?.name}/issues/${number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      #{number}
                    </a>
                  </p>

                  <p>
                    <a href={`https://github.com/${author?.login}`}>
                      <strong>{author?.login}</strong>
                    </a>{" "}
                    opened {createdAt} {closedAt && `(closed ${closedAt})`}
                  </p>

                  <p>
                    {Object.entries(
                      reactions?.edges?.reduce(
                        (acc, edge) => ({
                          ...acc,
                          [edge?.node.content || ""]:
                            (acc[edge?.node.content || ""] || 0) + 1
                        }),
                        {} as Record<string, number>
                      ) || {}
                    ).map(([reaction, count]) => (
                      <span key={reaction}>
                        <Emoji
                          emoji={emojis[reaction as keyof typeof emojis]}
                          size={12}
                          tooltip
                        />
                        <sup>{count}</sup>
                      </span>
                    ))}
                  </p>

                  {Object.entries(node).length ? (
                    <pre>
                      <code>{JSON.stringify(node, null, 2)}</code>
                    </pre>
                  ) : (
                    undefined
                  )}
                </div>
              </li>
            )
          )}
      </ul>
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

export const Main = connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ query: { query, results } }) => ({
    search: query.search,
    outputSearch: getQueryString(query),
    searchResults: results
  }),
  dispatch => bindActionCreators({ dispatchSetSearch: setSearch }, dispatch)
)(MainComponent);

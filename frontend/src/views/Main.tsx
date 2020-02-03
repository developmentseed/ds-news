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
      <ul>
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
              <li key={i}>
                <div>
                  <a
                    href={`https://github.com/${repository?.owner.login}/${repository?.name}/issues/${number}`}
                  >
                    <h6>{title}</h6>
                  </a>

                  <p className="mb-0">
                    <a
                      href={`https://github.com/${repository?.owner.login}/${repository?.name}`}
                      className="pill"
                    >
                      {repository?.owner.login}/{repository?.name}
                    </a>{" "}
                    <a
                      href={`https://github.com/${repository?.owner.login}/${repository?.name}/issues/${number}`}
                    >
                      #{number}
                    </a>
                  </p>

                  <p className="mb-0">
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
                          size={16}
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

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  ({ query: { query, results } }) => ({
    search: query.search,
    outputSearch: getQueryString(query),
    searchResults: results
  }),
  dispatch => bindActionCreators({ dispatchSetSearch: setSearch }, dispatch)
)(Main);

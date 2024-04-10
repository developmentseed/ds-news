import React from "react";
import moment from "moment";
import { IssueNode } from "../../services/Github";

const emojis = {
  CONFUSED: "😕",
  EYES: "👀",
  HEART: "❤️",
  HOORAY: "🎉",
  LAUGH: "😀",
  ROCKET: "🚀",
  THUMBS_DOWN: "👎",
  THUMBS_UP: "👍",
};

export default ({
  title,
  number,
  author,
  createdAt,
  closedAt,
  repository,
  reactions,
  comments,
}: Props) => (
  <li className={`issue ${closedAt ? "closed" : ""}`}>
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
        tabIndex={-1}
      >
        <strong>{repository?.name}</strong>#{number}
      </a>
      {" by "}
      {/* Author */}
      <a href={`https://github.com/${author?.login}`} tabIndex={-1}>
        <img
          src={author?.avatarUrl}
          alt={`${author?.login} profile pic`}
          className="mr-1"
          style={{
            maxHeight: "1rem",
            borderRadius: 2,
            verticalAlign: "text-top",
          }}
        />
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
      {reactions.edges?.length ? (
        Object.entries(
          reactions?.edges?.reduce(
            (acc, edge) => ({
              ...acc,
              [edge?.node.content || ""]:
                (acc[edge?.node.content || ""] || 0) + 1,
            }),
            {} as Record<string, number>
          ) || {}
        )
          .slice()
          .sort(([r1], [r2]) => (r2 > r1 ? -1 : 1))
          .map(([reaction, count]) => (
            <span key={reaction} style={{ fontSize: 16 }} title={reaction}>
              {emojis[reaction as keyof typeof emojis]}
              {count > 1 && <sup>{count}</sup>}
            </span>
          ))
      ) : (
        <em className="small">no reactions</em>
      )}
      {" | "}
      <span>
        {comments.totalCount ? (
          <>
            <span style={{ fontSize: 16 }}>💬</span>
            {comments.totalCount > 1 && (
              <sup>
                {comments.totalCount === 100 ? "100+" : comments.totalCount}
              </sup>
            )}
          </>
        ) : (
          <em className="small">no comments</em>
        )}
      </span>
    </p>
  </li>
);

interface Props extends IssueNode {}

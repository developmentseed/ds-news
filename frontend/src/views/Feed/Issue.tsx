import React from "react";
import { Emoji } from "emoji-mart";
import moment from "moment";
import { IssueNode } from "../../services/Github";

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

export default ({
  title,
  number,
  author,
  createdAt,
  closedAt,
  repository,
  reactions,
  comments
}: Props) => (
  <li className={closedAt ? "closed" : ""}>
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
      <a href={`https://github.com/${author?.login}`}>{author?.login}</a>{" "}
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
          <span key={reaction}>
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
      <span>
        {comments.totalCount ? (
          <>
            <Emoji emoji={"speech_balloon"} size={16} tooltip />
            <sup>
              {comments.totalCount === 100 ? "100+" : comments.totalCount}
            </sup>
          </>
        ) : (
          <em className="small">no comments</em>
        )}
      </span>
    </p>
  </li>
);

interface Props extends IssueNode {}

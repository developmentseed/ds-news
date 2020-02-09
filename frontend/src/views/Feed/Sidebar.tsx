import React from "react";
import { getQueryString } from "../../store/query/query.selectors";
import { RootState } from "../../store/types";
import { setSearchTerm } from "../../store/query/query.actions";
import { Circle } from "./Circle";

const Close = () => (
  <span
    className="ml-1"
    title="remove repo"
    style={{
      display: "inline-block",
      boxSizing: "border-box",
      width: "12px",
      height: "12px",
      borderWidth: "3px",
      borderStyle: " solid",
      borderRadius: "100%",
      background:
        " -webkit-linear-gradient(-45deg, transparent 0%, transparent 46%, white 46%,  white 56%,transparent 56%, transparent 100%), -webkit-linear-gradient(45deg, transparent 0%, transparent 46%, white 46%,  white 56%,transparent 56%, transparent 100%)",
      backgroundColor: "#555",
      borderColor: "#555",
      transition: "all 0.3s ease",
      verticalAlign: "middle",
      cursor: "pointer"
    }}
  />
);
export default ({ query, polling, dispatchSetSearchTerm }: Props) => (
  <ul className="col-sm-3 list-unstyled">
    <li>
      <input
        placeholder="Search"
        value={query.search}
        style={{ fontFamily: "monospace", width: "100%" }}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          dispatchSetSearchTerm(e.currentTarget.value)
        }
      />
    </li>

    <li>
      <h4 className="label mt-2 mb-1">Auto-Refresh</h4>
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          checked={polling.active}
          id="polling-switch"
        />
        <label className="custom-control-label mr-2" htmlFor="polling-switch">
          auto refresh
        </label>
        {polling.active && (
          <Circle
            strokeWidth={2}
            size={25}
            percentage={Math.round((polling.count! / polling.interval) * 100)}
          >
            {" "}
            <text className="circle-text" x="50%" y="65%" textAnchor="middle">
              {polling.count || polling.interval}
            </text>
          </Circle>
        )}
      </div>
    </li>

    <li>
      <h4 className="label mt-2 mb-1">Repo</h4>
      <ul className="list-unstyled">
        {query.repo
          .slice()
          .sort()
          .map((repo, i) => (
            <li key={repo} className="">
              <Close />
              <pre className="ml-1 d-inline">{repo}</pre>
            </li>
          ))}
      </ul>
      <input
        type="text"
        placeholder="owner/repo"
        style={{ fontFamily: "monospace" }}
        className="input-sm form-control-sm"
      />
      <button type="button" className="btn btn-secondary btn-sm">
        add
      </button>
    </li>

    <li>
      <h4 className="label mt-2 mb-1">Query</h4>
      <code>{getQueryString(query)}</code>
    </li>
  </ul>
);

interface Props {
  query: RootState["query"]["query"];
  polling: RootState["query"]["polling"];
  dispatchSetSearchTerm: typeof setSearchTerm;
}

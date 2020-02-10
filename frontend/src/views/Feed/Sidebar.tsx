import React, { useState } from "react";
import { RootState } from "../../store/types";
import {
  setSearchTerm,
  rmRepo,
  addRepo
} from "../../store/query/query.actions";

export default ({
  query: { repo },
  results,
  dispatchAddRepo,
  dispatchRmRepo
}: Props) => {
  const [repoName, setRepoName] = useState("");
  return (
    <ul className="col-sm-3 list-unstyled sidebar">
      <li className="mt-2 ">
      <h4>status</h4>
        <span className="text-monospace small">
        {results &&
          (results.status === "FETCHING"
            ? "loading..."
            : `${results.asOf.toLowerCase()}`)}
        </span>
      </li>

      <li>
        <h4>Repos</h4>
        <ul className="list-unstyled">
          {repo
            .slice()
            .sort()
            .map((repo, i) => (
              <li key={i} className="overflow-auto text-nowrap">
                <span
                  className="ml-1 close-link"
                  title="remove repo"
                  onClick={() => dispatchRmRepo(repo)}
                />
                <pre className="ml-1 d-inline">{repo}</pre>
              </li>
            ))}
        </ul>
        <form
          onSubmit={e => {
            e.preventDefault();
            dispatchAddRepo(repoName);
            setRepoName("");
          }}
        >
          <input
            type="text"
            placeholder="owner/repo"
            className="small text-monospace w-100 pl-1 mt-2"
            value={repoName}
            onChange={e => setRepoName(e.currentTarget.value)}
          />
        </form>
      </li>
    </ul>
  );
};

interface Props {
  query: RootState["query"]["query"];
  results: RootState["query"]["results"];
  dispatchAddRepo: typeof addRepo;
  dispatchRmRepo: typeof rmRepo;
}

import React, { useState } from "react";
import moment from "moment";
import { rmRepo, addRepo } from "../../store/query/query.actions";
import { RootState } from "typesafe-actions";

const QueryStatus: React.SFC<{ results: RootState["query"]["results"] }> = ({
  results
}) => (
  <div className="text-monospace small">
    {results &&
      (results.status === "FETCHING"
        ? "loading..."
        : `${results.asOf.toLowerCase()}`)}{" "}
  </div>
);

const RefreshCountdown: React.SFC<{ seconds: number }> = ({ seconds }) => (
  <div className="text-monospace small" style={{ color: "#aaa" }}>
    (refreshing in{" "}
    {seconds > 45
      ? moment()
          .add(seconds, "seconds")
          .fromNow(true)
      : `${seconds} seconds`}
    )
  </div>
);

const RepoList: React.SFC<{
  repos: RootState["query"]["query"]["repo"];
  dispatchRmRepo: typeof rmRepo;
}> = ({ repos, dispatchRmRepo }) => (
  <ul className="list-unstyled">
    {repos
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
);

const RepoForm: React.SFC<{ dispatchAddRepo: typeof addRepo }> = ({
  dispatchAddRepo
}) => {
  const [repoName, setRepoName] = useState("");
  return (
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
  );
};

export default ({
  repos,
  secondsUntilNextPoll,
  results,
  dispatchAddRepo,
  dispatchRmRepo
}: Props) => {
  return (
    <ul className="col-sm-3 list-unstyled sidebar">
      <li className="mt-2 ">
        <h4>last updated</h4>
        <QueryStatus results={results} />
        {!!secondsUntilNextPoll && (
          <RefreshCountdown seconds={secondsUntilNextPoll} />
        )}
      </li>

      <li>
        <h4>Repos</h4>
        <RepoList repos={repos} dispatchRmRepo={dispatchRmRepo} />
        <RepoForm dispatchAddRepo={dispatchAddRepo} />
      </li>
    </ul>
  );
};

interface Props {
  repos: RootState["query"]["query"]["repo"];
  secondsUntilNextPoll: RootState["query"]["polling"]["count"];
  results: RootState["query"]["results"];
  dispatchAddRepo: typeof addRepo;
  dispatchRmRepo: typeof rmRepo;
}

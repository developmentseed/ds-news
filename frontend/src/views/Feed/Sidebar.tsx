import React, { useState } from "react";
import moment from "moment";
import * as actions from "../../store/query/query.actions";
import { RootState } from "typesafe-actions";

const QueryStatus: React.SFC<{ results: RootState["query"]["results"] }> = ({
  results
}) => (
  <div className="text-monospace small">
    {results &&
      (results.status === "FETCHING"
        ? "loading..."
        : `${results.asOf.toLowerCase()}`)}
  </div>
);

const RefreshCountdown: React.SFC<{ seconds: number | null }> = ({
  seconds
}) => (
  <div className="text-monospace small faded">
    refreshing in{" "}
    {seconds
      ? seconds > 45
        ? moment()
            .add(seconds, "seconds")
            .fromNow(true)
        : `${seconds} seconds`
      : "..."}
  </div>
);

const FilterList: React.SFC<{
  entries: string[];
  dispatchRmEntry: (item: string) => void;
  title: string;
  fallbackText: React.ReactNode;
}> = ({ entries, dispatchRmEntry, title, fallbackText }) => (
  <ul className="list-unstyled">
    {entries.length
      ? entries
          .slice()
          .sort()
          .map((entry, i) => (
            <li key={i} className="overflow-auto text-nowrap">
              <span
                className="ml-1 close-link"
                title={`remove ${title}`}
                onClick={() => dispatchRmEntry(entry)}
              />
              <pre className="ml-1 d-inline">{entry}</pre>
            </li>
          ))
      : fallbackText}
  </ul>
);

const FilterForm: React.SFC<{
  dispatchAddEntry: (item: string) => void;
  placeholder: string;
}> = ({ dispatchAddEntry, placeholder }) => {
  const [entry, setEntry] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatchAddEntry(entry);
        setEntry("");
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="small text-monospace w-100 pl-1 mt-2"
        value={entry}
        onChange={e => setEntry(e.currentTarget.value)}
      />
    </form>
  );
};

export default ({
  secondsUntilNextPoll,
  results,
  repos,
  dispatchAddRepo,
  dispatchRmRepo,
  authors,
  dispatchAddAuthor,
  dispatchRmAuthor
}: Props) => {
  return (
    <ul className="col-sm-3 list-unstyled sidebar">
      <li className="mt-2 ">
        <h4>last updated</h4>
        <QueryStatus results={results} />
        <RefreshCountdown seconds={secondsUntilNextPoll} />
      </li>

      <li>
        <h4>Repos</h4>
        <FilterList
          title="repo"
          entries={repos}
          dispatchRmEntry={dispatchRmRepo}
          fallbackText={<strong>at least one repo required</strong>}
        />
        <FilterForm
          placeholder="owner/repo"
          dispatchAddEntry={dispatchAddRepo}
        />
      </li>

      <li>
        <h4>Authors</h4>
        <FilterList
          title="author"
          entries={authors}
          dispatchRmEntry={dispatchRmAuthor}
          fallbackText={
            <div className="text-monospace small faded">all authors</div>
          }
        />
        <FilterForm
          placeholder="username"
          dispatchAddEntry={dispatchAddAuthor}
        />
      </li>
    </ul>
  );
};

interface Props {
  repos: RootState["query"]["query"]["repo"];
  authors: RootState["query"]["query"]["author"];
  secondsUntilNextPoll: RootState["query"]["polling"]["count"];
  results: RootState["query"]["results"];
  dispatchAddAuthor: typeof actions.addAuthor;
  dispatchRmAuthor: typeof actions.rmAuthor;
  dispatchAddRepo: typeof actions.addRepo;
  dispatchRmRepo: typeof actions.rmRepo;
}

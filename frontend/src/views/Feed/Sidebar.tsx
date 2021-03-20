import React, { useState } from "react";
import moment from "moment";
import * as actions from "../../store/query/query.actions";
import { RootState } from "typesafe-actions";

const QueryStatus: React.FC<{ results: RootState["query"]["results"] }> = ({
  results,
}) => (
  <div className="text-monospace small">
    {results &&
      (results.status === "FETCHING"
        ? "loading..."
        : `${results.asOf.toLowerCase()}`)}
  </div>
);

const RefreshCountdown: React.FC<{ seconds: number | null }> = ({
  seconds,
}) => (
  <div className="text-monospace small faded">
    refreshing in{" "}
    {seconds
      ? seconds > 45
        ? moment().add(seconds, "seconds").fromNow(true)
        : `${seconds} seconds`
      : "..."}
  </div>
);

const FilterEntry: React.FC<{
  title: string;
  entry: string;
  ignored: boolean;
  ignore: (item: string) => void;
  unignore: (item: string) => void;
  remove: (item: string) => void;
}> = (props) => (
  <>
    <span
      className="ml-1 close-link pointer"
      title={`remove ${props.title}`}
      onClick={() => props.remove(props.entry)}
    />
    <pre
      className={`ml-1 d-inline pointer ${props.ignored ? "strikethrough" : ""}`}
      onClick={() =>
        props.ignored ? props.unignore(props.entry) : props.ignore(props.entry)
      }
    >
      {props.entry}
    </pre>
  </>
);

const FilterList: React.FC<{
  entries: string[];
  ignored: string[];
  dispatchRmEntry: (item: string) => void;
  dispatchIgnoreEntry: (item: string) => void;
  dispatchUnignoreEntry: (item: string) => void;
  title: string;
  fallbackText: React.ReactNode;
}> = ({
  entries,
  dispatchRmEntry,
  dispatchIgnoreEntry,
  dispatchUnignoreEntry,
  title,
  fallbackText,
  ignored,
}) => (
  <ul className="list-unstyled">
    {entries.length
      ? entries
          .slice()
          .sort()
          .map((entry, i) => (
            <li key={i} className="overflow-auto text-nowrap">
              <FilterEntry
                title={title}
                entry={entry}
                ignored={ignored.includes(entry)}
                ignore={dispatchIgnoreEntry.bind(entry)}
                unignore={dispatchUnignoreEntry.bind(entry)}
                remove={dispatchRmEntry.bind(entry)}
              />
            </li>
          ))
      : fallbackText}
  </ul>
);

const FilterForm: React.FC<{
  dispatchAddEntry: (item: string) => void;
  placeholder: string;
}> = ({ dispatchAddEntry, placeholder }) => {
  const [entry, setEntry] = useState("");
  return (
    <form
      onSubmit={(e) => {
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
        onChange={(e) => setEntry(e.currentTarget.value)}
      />
    </form>
  );
};

export default (props: Props) => {
  return (
    <ul className="col-sm-3 list-unstyled sidebar">
      <li className="mt-2 ">
        <h4>last updated</h4>
        <QueryStatus results={props.results} />
        <RefreshCountdown seconds={props.secondsUntilNextPoll} />
      </li>

      <li>
        <h4>Repos</h4>
        <FilterList
          title="repo"
          entries={props.repos}
          ignored={props.ignoredRepos}
          dispatchRmEntry={props.dispatchRmRepo}
          dispatchIgnoreEntry={props.dispatchIgnoreRepo}
          dispatchUnignoreEntry={props.dispatchUnignoreRepo}
          fallbackText={<p className="error">at least one repo required</p>}
        />
        <FilterForm
          placeholder="owner/repo"
          dispatchAddEntry={props.dispatchAddRepo}
        />
      </li>

      <li>
        <h4>Authors</h4>
        <FilterList
          title="author"
          entries={props.authors}
          ignored={props.ignoredAuthors}
          dispatchRmEntry={props.dispatchRmAuthor}
          dispatchIgnoreEntry={props.dispatchIgnoreAuthor}
          dispatchUnignoreEntry={props.dispatchUnignoreAuthor}
          fallbackText={
            <div className="text-monospace small faded">all authors</div>
          }
        />
        <FilterForm
          placeholder="username"
          dispatchAddEntry={props.dispatchAddAuthor}
        />
      </li>
    </ul>
  );
};

interface Props {
  repos: RootState["query"]["query"]["repo"];
  ignoredRepos: RootState["query"]["query"]["ignoredRepo"];
  authors: RootState["query"]["query"]["author"];
  ignoredAuthors: RootState["query"]["query"]["ignoredAuthor"];
  secondsUntilNextPoll: RootState["query"]["polling"]["count"];
  results: RootState["query"]["results"];
  dispatchAddRepo: typeof actions.addRepo;
  dispatchRmRepo: typeof actions.rmRepo;
  dispatchIgnoreRepo: typeof actions.ignoreRepo;
  dispatchUnignoreRepo: typeof actions.unignoreRepo;
  dispatchAddAuthor: typeof actions.addAuthor;
  dispatchRmAuthor: typeof actions.rmAuthor;
  dispatchIgnoreAuthor: typeof actions.ignoreAuthor;
  dispatchUnignoreAuthor: typeof actions.unignoreAuthor;
}

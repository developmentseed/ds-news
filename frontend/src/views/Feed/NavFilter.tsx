import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { QueryState } from "../../store/query/query.reducer";

const sortOptions = {
  created: "recently created",
  updated: "recently updated",
  interactions: "interactions",
  "reactions-heart": "loved",
  "reactions-tada": "celebrated",
  reactions: "reactions",
  "reactions-+1": "liked",
  "reactions--1": "disliked",
};

export default ({
  sort,
  setSort,
  searchTerm,
  setSearchTerm,
  isFetching,
  triggerSearch,
}: Props) => (
  <nav className="navbar px-0">
    <ul className="d-flex" style={{ flexGrow: 1 }}>
      <li className="w-100">
        <div className="input-group input-group-sm ">
          <input
            placeholder="Search"
            value={searchTerm}
            className={`form-control text-monospace w-100 ${
              isFetching ? "loading" : ""
            }`}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setSearchTerm(e.currentTarget.value)
            }
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              disabled={isFetching}
              onClick={() => triggerSearch()}
            >
              {isFetching ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : 
                <span className="pl-1">↻</span>
              }
            </button>
          </div>
        </div>
      </li>
    </ul>
    <ul className="ml-auto">
      <li className="ml-2">
        <UncontrolledDropdown className="d-inline">
          <DropdownToggle tag="a" className="link-button d-inline-block">
            most {sortOptions[sort as keyof typeof sortOptions]} ▼
          </DropdownToggle>{" "}
          <DropdownMenu>
            {Object.entries(sortOptions).map(([key, value]) => (
              <DropdownItem key={key} onClick={() => setSort(key)}>
                {value}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </li>
    </ul>
  </nav>
);

interface Props {
  sort: QueryState["query"]["sort"];
  setSort: (sort: string) => void;
  searchTerm: QueryState["query"]["search"];
  setSearchTerm: (term: string) => void;
  triggerSearch: () => void;
  isFetching: boolean;
}

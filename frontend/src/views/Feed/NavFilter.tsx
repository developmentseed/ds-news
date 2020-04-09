import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { QueryState } from "../../store/query/query.reducer";

export default ({ sort, setSort, searchTerm, setSearchTerm }: Props) => {
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
  return (
    <nav className="navbar px-0">
      <ul className="d-flex" style={{ flexGrow: 1 }}>
        <li className="w-100">
          <input
            placeholder="Search"
            value={searchTerm}
            className="text-monospace w-100"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setSearchTerm(e.currentTarget.value)
            }
          />
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
};

interface Props {
  sort: QueryState["query"]["sort"];
  setSort: (sort: string) => void;
  searchTerm: QueryState["query"]["search"];
  setSearchTerm: (term: string) => void;
}

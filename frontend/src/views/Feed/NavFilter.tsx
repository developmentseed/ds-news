import React from "react";

export default () => (
  <nav className="navbar">
    <ul className="filter-bar">
      {[
        ["all time", undefined],
        ["today", "created:>=TODO"],
        ["this week", "created:>=TODO"],
        ["this month", "created:>=TODO"],
        ["this year", "created:>=TODO"]
      ].map(([title, query], i) => (
        <li key={i}>
          {i ? <span className="m-1">{"|"}</span> : ""}
          <button
            className={`link-button ${title === "all time" ? "selected" : ""}`}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
    <ul>
      <li>sort by ▼</li>
    </ul>
  </nav>
);

import { createSelector } from "reselect";
import { QueryState } from "./query.reducer";

const getQuery = (query: QueryState["query"]) => query;

/**
 * Convert the query object into a Github compliant query string
 */
export const getQueryString = createSelector([getQuery], (queryState) => {
  const { repo, author, ignoredAuthor, ignoredRepo, ...query } = queryState;
  return (
    Object.entries({
      ...query,
      repo: repo.filter((entry) => !ignoredRepo.includes(entry)),
      author: author.filter((entry) => !ignoredAuthor.includes(entry)),
    })
      // Ignore empty queries
      .filter(([_, value]) => (Array.isArray(value) ? value.length : value))
      // Break array values into array of key + value
      .flatMap(([key, value]) =>
        Array.isArray(value)
          ? (value as Array<number | string>).map((v) => [key, v])
          : [[key, value]]
      )
      // Format as key:value
      .map(([key, value]) => (key === "search" ? value : `${key}:${value}`))
      .join(" ")
  );
});

import { QueryState } from "./query.reducer";

export const getQueryFromString = (url: string) =>
  decodeURIComponent(url)
    .split(" ")
    .map(v => v.split(":"))
    .reduce(
      (acc, v) => ({
        ...acc,
        // Anything aside from 'sort' or 'repo' goes in search
        ...(v.filter(Boolean).length === 1 || !["sort", "repo"].includes(v[0])
          ? {
              search: acc.search ? `${acc.search} ${v.join(":")}` : v.join(":")
            }
          : // Put anything with a ':' in store under key
            {
              [v[0]]: (acc[v[0] as keyof QueryState["query"]] || []).concat(
                v.slice(1).join(":") // rejoin any colons in value
              )
            })
      }),
      {} as QueryState["query"]
    );

import { QueryState } from "./query.reducer";

export const getQueryFromUrl = (url: string) =>
  decodeURIComponent(url)
    .split(" ")
    .map(v => v.split(":"))
    .reduce(
      (acc, v) => ({
        ...acc,
        // Anything without ':' will be a raw search term
        ...(v.length === 1
          ? {
              search: acc.search ? `${acc.search} ${v[0]}` : v[0]
            }
          : // Put anything with a ':' in store under key
            {
              [v[0]]: ((acc[v[0]] as string[]) || []).concat(
                v.slice(1).join(":")
              )
            })
      }),
      {} as QueryState["query"]
    );

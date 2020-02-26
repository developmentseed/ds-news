import { graphql } from "@octokit/graphql";

export class Github {
  query = ({ query, token }: { query: string; token: string }) =>
    graphql(
      `
        query($searchQuery: String!) {
          search(query: $searchQuery, type: ISSUE, first: 100) {
            issueCount
            nodes {
              ... on Issue {
                title
                number
                repository {
                  owner {
                    login
                  }
                  name
                }
                author {
                  login
                  avatarUrl
                }
                createdAt
                closedAt
                reactions(first: 100) {
                  edges {
                    node {
                      content
                    }
                  }
                }
                comments {
                  totalCount
                }
              }
            }
          }
        }
      `,
      {
        searchQuery: query,
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    ) as Promise<IssuesSearchResult>;
}

export interface IssuesSearchResult {
  search: Search;
}
interface Search {
  issueCount: number;
  nodes: IssueNode[];
}
export interface IssueNode {
  title: string;
  number: number;
  repository: Repository;
  author: Author;
  createdAt: string;
  closedAt: string;
  reactions: Reactions;
  comments: {
    totalCount: number;
  };
}
interface Repository {
  name: string;
  owner: {
    login: string;
  };
}
interface Author {
  login: string;
  avatarUrl: string;
}
interface Reactions {
  edges?: Array<ReactionEdgesEntity | null> | null;
}
interface ReactionEdgesEntity {
  node: ReactionsNode;
}
interface ReactionsNode {
  content: string;
}

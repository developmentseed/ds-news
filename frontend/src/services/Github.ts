import { graphql } from "@octokit/graphql";

export class Github {
  async query({ query, token }: { query: string; token: string }) {
    return graphql(
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
  // async query({ query, token }: { query: string; token: string }) {
  //   return this.client.query({
  //     query: gql`
  //       query($searchQuery: String!) {
  //         search(query: $searchQuery, type: ISSUE, first: 100) {
  //           issueCount
  //           edges {
  //             node {
  //               ... on Issue {
  //                 title
  //                 repository {
  //                   name
  //                 }
  //                 author {
  //                   login
  //                   avatarUrl
  //                 }
  //                 createdAt
  //                 closedAt
  //                 reactions(first: 100) {
  //                   edges {
  //                     node {
  //                       content
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `,
  //     variables: {
  //       searchQuery: query
  //     },
  //     context: {
  //       headers: {
  //         authorization: `Bearer ${token}`
  //       }
  //     }
  //   });
  // }

  // async searchIssues({ query, token }: { query: string; token: string }) {
  //   return this.client.query({
  //     query: gql`
  //       query($searchQuery: String!) {
  //         search(query: $searchQuery, type: ISSUE, first: 100) {
  //           issueCount
  //           edges {
  //             node {
  //               ... on Issue {
  //                 title
  //                 repository {
  //                   name
  //                 }
  //                 author {
  //                   login
  //                   avatarUrl
  //                 }
  //                 createdAt
  //                 closedAt
  //                 reactions(first: 100) {
  //                   edges {
  //                     node {
  //                       content
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `,
  //     variables: {
  //       searchQuery: query
  //     },
  //     context: {
  //       headers: {
  //         authorization: `Bearer ${token}`
  //       }
  //     }
  //   });
  // }

  // async getUser({ token }: { token: string }) {
  //   return this.client.query({
  //     query: gql`
  //       viewer {
  //         login
  //         avatarUrl
  //       }
  //     `,
  //     context: {
  //       headers: {
  //         authorization: `Bearer ${token}`
  //       }
  //     }
  //   });
  // }
}

export interface IssuesSearchResult {
  search: Search;
}
interface Search {
  issueCount: number;
  nodes: IssueNode[];
}
interface IssueNode {
  title?: string | null;
  number?: number | null;
  repository?: Repository | null;
  author?: Author | null;
  createdAt?: string | null;
  closedAt?: string | null;
  reactions?: Reactions | null;
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

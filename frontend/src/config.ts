const apiBase = process.env.REACT_APP_API_URL;
if (!apiBase) throw new Error('Variable "REACT_APP_API_URL" not set');
const clientId = process.env.REACT_APP_GH_CLIENT_ID;
if (!clientId) throw new Error('Variable "REACT_APP_GH_CLIENT_ID" not set');

const config = {
  clientId,
  searchDebounceMs: 300,
  basePath: process.env.PUBLIC_URL,
  api: {
    auth: apiBase,
  },
  paths: {
    feed: "/",
  },
  defaultRepos: process.env.REACT_APP_DEFAULT_REPOS?.split(" ").flatMap(l => l.split("\n")).flatMap(l => l.split("\r")).filter(Boolean) || [],
};

export default config;

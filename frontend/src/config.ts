const apiBase = process.env.REACT_APP_API_URL;
if (!apiBase) throw new Error('Variable "REACT_APP_API_URL" not set');
const clientId = process.env.REACT_APP_GH_CLIENT_ID;
if (!clientId) throw new Error('Variable "REACT_APP_GH_CLIENT_ID" not set');
const domain = process.env.REACT_APP_DOMAIN;
if (!domain) throw new Error('Variable "REACT_APP_DOMAIN" not set');

export default {
  clientId,
  domain,
  searchDebounceMs: 300,
  basePath: process.env.PUBLIC_URL,
  api: {
    auth: `${apiBase}/auth`
  },
  paths: {
    feed: "/",
    login: "/login"
  }
};

const apiBase = process.env.REACT_APP_API_URL;
if (!apiBase) throw new Error('Variable "REACT_APP_API_URL" not set');

export default {
  api: {
    auth: `${apiBase}auth`
  }
};

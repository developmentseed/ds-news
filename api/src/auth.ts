import axios from "axios";

const client_id = process.env.CLIENT_ID;
if (!client_id) throw new Error("Env parameter 'CLIENT_ID' is not set");
const client_secret = process.env.CLIENT_SECRET;
if (!client_secret) throw new Error("Env parameter 'CLIENT_SECRET' is not set");

export const handler = async ({ body = "{}" }) => {
  const { code }: { code: string } = JSON.parse(body);

  const headers = { "content-type": "application/json" };
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id,
      client_secret,
      code
    },
    { headers }
  );

  const text = await response.data;
  const json = text
    .split("&")
    .map((val: string) => val.split("="))
    .reduce(
      (acc: Record<string, string>, [key, val]: [string, string]) => ({
        ...acc,
        [key]: val
      }),
      {}
    );

  return {
    statusCode: response.status,
    headers: {
      ...headers,
      "access-control-allow-origin": "*"
    },
    body: JSON.stringify(json)
  };
};

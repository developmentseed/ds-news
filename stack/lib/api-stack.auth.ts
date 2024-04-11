import { LambdaFunctionURLHandler } from "aws-lambda";

const client_id = process.env.CLIENT_ID;
if (!client_id) throw new Error("Env parameter 'CLIENT_ID' is not set");
const client_secret = process.env.CLIENT_SECRET;
if (!client_secret) throw new Error("Env parameter 'CLIENT_SECRET' is not set");

export const handler: LambdaFunctionURLHandler = async ({
  body,
  requestContext,
}) => {
  console.log(JSON.stringify(requestContext.http));
  const headers = {
    "access-control-allow-origin": "https://news.ds.io",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "content-type": "application/json",
  };

  switch (requestContext.http.method) {
    case "OPTIONS":
      return { statusCode: 204, headers };

    case "POST":
      if (!body)
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Bad Request, no data" }),
        };
      const { code = undefined }: { code?: string } = JSON.parse(body);
      if (!code)
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Missing code" }),
        };

      const response = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          body: JSON.stringify({ client_id, client_secret, code }),
          headers: { "content-type": "application/json" },
        }
      );

      const text = await response.text();
      const json = text
        .split("&")
        .map((val) => val.split("="))
        .reduce(
          (acc: Record<string, string>, [key, val]: string[]) => ({
            ...acc,
            [key]: val,
          }),
          {}
        );

      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify(json),
      };

    default:
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
  }
};

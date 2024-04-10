import { LambdaFunctionURLHandler } from "aws-lambda";

const client_id = process.env.CLIENT_ID;
if (!client_id) throw new Error("Env parameter 'CLIENT_ID' is not set");
const client_secret = process.env.CLIENT_SECRET;
if (!client_secret) throw new Error("Env parameter 'CLIENT_SECRET' is not set");

export const handler: LambdaFunctionURLHandler = async ({
  body,
  requestContext,
}) => {
  if (requestContext.http.method !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

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

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    body: JSON.stringify({ client_id, client_secret, code }),
    headers: { "content-type": "application/json" },
  });

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
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
    },
    body: JSON.stringify(json),
  };
};

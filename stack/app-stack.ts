#!/usr/bin/env node
import { config } from "dotenv";
import "source-map-support/register";
import { ApiStack } from "./lib/api-stack";
import { App } from "aws-cdk-lib";

config();

const name = "ds-news";
const app = new App();

const ghClientId = process.env.GH_CLIENT_ID;
if (!ghClientId) throw new Error("Env parameter 'GH_CLIENT_ID' is not set");
const ghClientSecret = process.env.GH_CLIENT_SECRET;
if (!ghClientSecret)
  throw new Error("Env parameter 'GH_CLIENT_SECRET' is not set");

new ApiStack(app, `${name}-api`, {
  ghClientId,
  ghClientSecret,
});

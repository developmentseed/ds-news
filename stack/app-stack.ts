#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { config } from "dotenv";
import "source-map-support/register";
import { ApiStack } from "./lib/api-stack";

config();

const name = "DSNews";
const app = new cdk.App();

const ghClientId = process.env.GH_CLIENT_ID;
if (!ghClientId) throw new Error("Env parameter 'GH_CLIENT_ID' is not set");
const ghClientSecret = process.env.GH_CLIENT_SECRET;
if (!ghClientSecret)
  throw new Error("Env parameter 'GH_CLIENT_SECRET' is not set");

new ApiStack(app, `${name}-Api`, {
  ghClientId,
  ghClientSecret
});

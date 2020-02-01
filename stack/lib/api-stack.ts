import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as logs from "@aws-cdk/aws-logs";
import * as cdk from "@aws-cdk/core";

export class ApiStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    { ghClientId, ghClientSecret, ...props }: Props
  ) {
    super(scope, id, props);

    // TODO: Build TS project (run npm install, tsc, and copy node_modules into dist)

    // Create API handler funcnction
    const apiHandler = new lambda.Function(this, "apiHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "auth.handler",
      code: lambda.Code.asset("./api/dist"),
      environment: {
        CLIENT_ID: ghClientId,
        CLIENT_SECRET: ghClientSecret
      },
      tracing: lambda.Tracing.ACTIVE,
      logRetention: logs.RetentionDays.SIX_MONTHS
    });

    // Create & configure API
    const api = new apigateway.RestApi(this, "api", {
      deployOptions: {
        stageName: "dev"
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS, // TODO: Tighten this up
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    });
    api.root
      .addResource("auth")
      .addMethod("POST", new apigateway.LambdaIntegration(apiHandler));
  }
}

interface Props extends cdk.StackProps {
  ghClientId: string;
  ghClientSecret: string;
}

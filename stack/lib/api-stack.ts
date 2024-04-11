import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambda_nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as logs from "aws-cdk-lib/aws-logs";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

export class ApiStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    { ghClientId, ghClientSecret, ...props }: Props
  ) {
    super(scope, id, props);

    // Create API handler function
    const apiHandler = new lambda_nodejs.NodejsFunction(this, "auth", {
      functionName: "ds-news-auth-api",
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: {
        CLIENT_ID: ghClientId,
        CLIENT_SECRET: ghClientSecret,
      },
      tracing: lambda.Tracing.ACTIVE,
      logRetention: logs.RetentionDays.SIX_MONTHS,
    });

    const { url } = apiHandler.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, "auth-api", {
      exportName: "auth-api",
      value: url,
    });
  }
}

interface Props extends StackProps {
  ghClientId: string;
  ghClientSecret: string;
}

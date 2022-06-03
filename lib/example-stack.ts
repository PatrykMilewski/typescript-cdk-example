#!/usr/bin/env node
import 'source-map-support/register';
import { EnvironmentConfig } from './read-config';
import { getCommonLambdaConfig } from './get-common-lambda-config';
import { aws_lambda_nodejs, Duration, Stack, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ExampleStack extends Stack {
  constructor(scope: Construct, id: string, props: EnvironmentConfig) {
    super(scope, id, props);

    const commonLambdaConfig = getCommonLambdaConfig(props);

    new aws_lambda_nodejs.NodejsFunction(this, 'lambda', {
      ...commonLambdaConfig,
      entry: './lib/lambda/example/handler.ts',
      timeout: Duration.seconds(25),
      environment: {
        ENV: props.stage,
        LOG_LEVEL: props.stage !== 'prod' ? 'DEBUG' : 'INFO',
      },
    });

    Tags.of(this).add('stack', 'input');
  }
}

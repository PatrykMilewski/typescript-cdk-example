import { EnvironmentConfig } from './read-config';
import { NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';

export const getCommonLambdaConfig = (props: EnvironmentConfig): NodejsFunctionProps => {
  return {
    handler: 'handler',
    tracing: props.stage !== 'prod' ? Tracing.ACTIVE : Tracing.DISABLED,
    runtime: Runtime.NODEJS_16_X,
    memorySize: 256,
    logRetention: RetentionDays.ONE_MONTH,
    bundling: {
      minify: true,
      keepNames: true,
      sourceMap: true,
    },
  };
};

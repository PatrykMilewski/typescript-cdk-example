import { ExampleStack } from './example-stack';
import { EnvironmentConfig } from './read-config';
import { Stage } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ExampleServiceStage extends Stage {
  constructor(scope: Construct, id: string, props: EnvironmentConfig) {
    super(scope, id);

    new ExampleStack(this, 'example', props);
  }
}

#!/usr/bin/env node
import 'source-map-support/register';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { EnvironmentConfig } from './read-config';
import { aws_codecommit, pipelines, Tags } from 'aws-cdk-lib';
import { getResourceNamePrefix, SERVICE_NAME } from './consts';
import { ExampleServiceStage } from './example-service-stage';

export class PipelinesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EnvironmentConfig) {
    super(scope, id, props);

    const repository = aws_codecommit.Repository.fromRepositoryName(this, 'repository', 'example');

    const pipeline = new pipelines.CodePipeline(this, `pipeline`, {
      synth: new pipelines.ShellStep('synth-step', {
        input: pipelines.CodePipelineSource.codeCommit(repository, 'dev'),
        commands: ['yarn run ci', 'yarn run check-types', `yarn run synth:${props.stage}`],
      }),
    });

    const stage = new ExampleServiceStage(this, getResourceNamePrefix(props), props);

    pipeline.addStage(stage);

    Tags.of(stage).add('project', SERVICE_NAME);
    Tags.of(stage).add('stage', props.stage);
  }
}

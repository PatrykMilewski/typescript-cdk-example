#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelinesStack } from '../lib/pipelines-stack';
import { readConfig } from '../lib/read-config';

const app = new cdk.App();

const stage = app.node.tryGetContext('config');

if (typeof stage !== 'string') {
  throw new Error('Provide valid stage name with -c <stage> option');
}

const config = readConfig(stage);

new PipelinesStack(app, `example-service-pipeline-${stage}`, config);

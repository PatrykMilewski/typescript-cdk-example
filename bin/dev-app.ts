#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { readConfig } from '../lib/read-config';
import { ExampleStack } from '../lib/example-stack';

const app = new cdk.App();

const stage = app.node.tryGetContext('config');
if (typeof stage !== 'string') {
  throw new Error('Provide valid stage name with -c <stage> option');
}
const config = readConfig(stage);

new ExampleStack(app, `example-${config.stage}`, config);

cdk.Tags.of(app).add('project', 'example');
cdk.Tags.of(app).add('stage', config.stage);

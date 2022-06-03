import { config as loadConfig } from 'dotenv';
import { StackProps } from 'aws-cdk-lib';

export interface EnvironmentConfig extends StackProps {
  stage: string;
  region: string;
}

export const readConfig = (stage: string): EnvironmentConfig => {
  const config = loadConfig({ path: `./config/.env.${stage}` });
  if (config.parsed) {
    return {
      ...config.parsed,
      env: {
        account: config.parsed.accountId as string,
        region: config.parsed.region as string,
      },
    } as unknown as EnvironmentConfig;
  }
  throw new Error('Invalid .env config.');
};

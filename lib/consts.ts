import { EnvironmentConfig } from './read-config';

export const SERVICE_NAME = 'example-service';

export const getResourceNamePrefix = (props: EnvironmentConfig): string => {
  return `${SERVICE_NAME}-${props.stage}`;
};

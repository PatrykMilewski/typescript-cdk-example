module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[t|j]s?$': require.resolve('@sucrase/jest-plugin'),
  },
  transformIgnorePatterns: ['node_modules/(?!node-fetch|fetch-blob)'],
  maxWorkers: 1,
};

Object.assign(process.env, {
  AWS_REGION: 'eu-west-1',
  REGION: 'eu-west-1',
  ENV: 'dev',
  AWS_PROFILE: 'default',
  AWS_SDK_LOAD_CONFIG: '1',
});

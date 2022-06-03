import { handler, InputEvent } from './handler';
import { EventBridgeEvent } from 'aws-lambda';

const event: InputEvent = {
  target: 'another-service-arn',
  date: new Date().toISOString(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

it('example test', async () => {
  const apiGwEventMock = {
    detail: JSON.stringify(event),
  } as unknown as EventBridgeEvent<string, InputEvent>;

  const result = await handler(apiGwEventMock);

  expect(result.statusCode).toBe(200);
});

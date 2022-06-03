import logger from '@dazn/lambda-powertools-logger';
import { APIGatewayProxyResult, EventBridgeEvent } from 'aws-lambda';

export interface InputEvent {
  target: string;
  date: string;
  comment?: string;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: EventBridgeEvent<string, InputEvent>): Promise<APIGatewayProxyResult> => {
  logger.debug('Input event', { event });

  try {
    if (new Date(event.detail.date).getTime() > Date.now()) {
      return {
        statusCode: 400,
        body: `Event is from the future, dropping it`,
      };
    }
    return {
      statusCode: 200,
      body: `Successfully forwarded an event to ${event.detail.target}`,
    };
  } catch (err) {
    logger.error('Failed to process an event', { event, err });
    throw err;
  }
};

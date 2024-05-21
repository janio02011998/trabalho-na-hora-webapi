import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { Express } from 'express';
import serverless from 'serverless-http';

export function ApiGatewayMiddleware(app: Express) {
  const handler = serverless(app);

  return async (
    event: APIGatewayEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> => {
    try {
      const _event = event;
      const _context = context;

      const result = (await handler(_event, _context)) as APIGatewayProxyResult;

      return result;
    } catch (error: any) {
      const message = `INTERNAL_SERVER_ERROR: ${error.message} `;
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: false,
          message: message,
        }),
      };
    }
  };
}

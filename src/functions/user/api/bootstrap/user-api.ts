import 'dotenv/config';
import { Express } from 'express';
import { createExpressServer } from 'routing-controllers';

import { ApiGatewayMiddleware } from '@app/shared/middleware';
import { isAwsLambda, LoggerServiceHelper } from '@app/shared/service';

import { UserControllerAuthorized } from '../../controllers/user.controller';

const publicControllers = [UserControllerAuthorized];

const app: Express = createExpressServer({
  cors: true,
  controllers: [...publicControllers],
  middlewares: [],
});

const startLocalServer = () => {
  const port = process.env.API_USER_PORT;
  app.listen(port, () => {
    new LoggerServiceHelper().debug({ routes: app.routes }, 'app.routes');
    new LoggerServiceHelper().debug(`Listening on: ${port}`);
  });
};

const startLambdaServer = () => {
  module.exports.handler = ApiGatewayMiddleware(app);
};

if (isAwsLambda()) {
  startLambdaServer();
} else {
  startLocalServer();
}

import { config } from 'dotenv';
import { Express } from 'express';
import { createExpressServer } from 'routing-controllers';

import { UserControllerAuthorized } from '../../controllers/user.controller';

config();

const publicControllers = [UserControllerAuthorized];

const app: Express = createExpressServer({
  cors: true,
  controllers: [...publicControllers],
  middlewares: [],
});

const API_PORT = process.env.API_USER_PORT;

app.listen(API_PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on: ${API_PORT}`);
});

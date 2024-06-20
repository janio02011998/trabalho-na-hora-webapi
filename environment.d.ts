import { EnvironmentEnum } from '@app/shared';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_USER_PORT: string;

      APP_LOG_LEVEL: string;
      APP_NAME: string;
      NODE_ENV: EnvironmentEnum;

      MONGO_CONNECTION_STRING: string;
      MONGO_PASSWORD: string;
      MONGO_USER: string;
      MONGO_DATABASE_NAME: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

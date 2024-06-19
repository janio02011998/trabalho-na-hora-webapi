import mongoose, { Connection, ConnectOptions } from 'mongoose';
import 'dotenv/config';

import { LoggerServiceHelper } from '../service';

let mongoConnection: Connection;

const getConnectionString = (): string => {
  return process.env.MONGO_CONNECTION_STRING;
};

const getConnectionConfig = (): ConnectOptions => {
  const dbName = process.env.MONGO_DATABASE_NAME;
  const appName = process.env.APP_NAME;

  const baseConnectionConfig = {
    ssl: false,
    tls: false,

    dbName,
    appName,

    minPoolSize: 1,
    maxPoolSize: 1,

    retryReads: true,
    readConcernLevel: 'majority',

    writeConcern: 'majority',
    retryWrites: false,

    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
  } as ConnectOptions;

  return baseConnectionConfig;
};

export const getMongoConnection = async (): Promise<Connection> => {
  const loggerServiceHelper = new LoggerServiceHelper();

  if (!mongoConnection) {
    const connectionString = getConnectionString();
    const connectionConfig = getConnectionConfig();

    try {
      const result = await mongoose.connect(connectionString, {
        ...connectionConfig,
      });

      mongoConnection = result.connection;
      loggerServiceHelper.debug('MongoDB is connected');
    } catch (error: any) {
      loggerServiceHelper.error(
        { error, connectionString, connectionConfig },
        'error-open-connection',
      );

      mongoConnection = null;
    }

    return mongoConnection;
  }
};

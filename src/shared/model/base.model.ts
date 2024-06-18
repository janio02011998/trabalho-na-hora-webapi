import mongoose, { Connection, ConnectOptions } from 'mongoose';

import { LoggerServiceHelper } from '../service';

let mongoConnection: Connection;

const getConnectionString = (): string => {
  return '';
};

const getConnectionConfig = (): ConnectOptions => {
  return {} as ConnectOptions;
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

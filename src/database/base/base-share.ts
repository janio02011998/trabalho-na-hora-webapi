import Container from 'typedi';

import { ILoggerServiceHelper, LoggerServiceHelper } from '@app/shared/service';

import { IDatabase } from './base-interface';

export class BaseShare<DTO> {
  public readonly loggerService: ILoggerServiceHelper;

  constructor(readonly database: IDatabase<DTO>) {
    this.loggerService = Container.get(LoggerServiceHelper);
  }

  public getModel = async () => {
    return await this.database.getModel();
  };
}

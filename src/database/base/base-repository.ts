import { FilterQuery, ProjectionFields } from 'mongoose';

import { IDatabase } from './base-interface';
import { BaseShared } from './base-share';

type InputQuery<T> = {
  filter: FilterQuery<T>;
  projection: ProjectionFields<T>;
};

export class BaseRepository<DTO> extends BaseShared<DTO> {
  constructor(
    readonly database: IDatabase<DTO>,
    private extraLog?: object,
  ) {
    super(database);
  }

  /**
   * @description Adds an object to the log
   */
  public addLog = (log: object) => {
    this.extraLog = { ...(this.extraLog || {}), log };
    return this;
  };

  /**
   * @description Method that allows the use of existing with cache
   */
  public existsMemo = async (
    input: Pick<InputQuery<DTO>, 'filter'>,
  ): Promise<boolean> => {
    return await this.exist(input.filter);
  };

  /**
   * @description Check if a record exists at the base
   */
  public exist = async (filter: FilterQuery<DTO>): Promise<boolean> => {
    const model = await this.getModel();
    const countRecords = await model.count(filter);
    const exist = countRecords === 0;

    return exist;
  };
}

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
   * @description Method that allows create a new record
   */
  public create = async (input: Partial<DTO>): Promise<boolean> => {
    const recordId = await this.createAndReturnId(input);
    if (recordId) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @description Create registration in the database
   */
  public createAndReturnId = async (input: Partial<DTO>): Promise<string> => {
    try {
      const model = await this.getModel();
      const record = new model(input);
      // ----------------------------------------------------------------
      await record
        .validate()
        .then(async () => await record.save())
        .catch(error =>
          this.loggerService.error(
            error,
            'BaseRepository::create::validateModel',
            [this.database.collectionName, input],
          ),
        );

      return record.recordId;
    } catch (error) {
      this.loggerService.error(error, 'BaseRepository::create', [
        this.database.collectionName,
        input,
      ]);
      throw new Error('ERROR_BASEREPOSITORY_NOT_CREATED');
    }
  };

  /**
   * @description Check if a record exists at the base
   */
  public exist = async (filter: FilterQuery<DTO>): Promise<boolean> => {
    const model = await this.getModel();
    const countRecords = await model.countDocuments(filter);
    const exist = countRecords === 0;

    return exist;
  };

  /**
   * @description Method that allows to count the records in the bank with cache
   */
  public countMemo = async (
    input: Pick<InputQuery<DTO>, 'filter'>,
  ): Promise<number> => {
    return await this.count(input.filter);
  };

  /**
   * @description Method that allows to count the records in the bank
   */
  public count = async (filter: FilterQuery<DTO>): Promise<number> => {
    const model = await this.getModel();
    const countRecords = await model.countDocuments(filter);

    return countRecords;
  };
}

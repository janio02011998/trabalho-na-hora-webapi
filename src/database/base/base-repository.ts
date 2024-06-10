import { IDatabase } from './base-interface';
import { BaseShared } from './base-share';

export class BaseRepository<DTO> extends BaseShared<DTO> {
  constructor(
    readonly database: IDatabase<DTO>,
    private extraLog?: object,
  ) {
    super(database);
  }

  public addLog = (log: object) => {
    this.extraLog = { ...(this.extraLog || {}), log };
    return this;
  };
}

import { Inject, Service } from 'typedi';

import { LoggerServiceHelper } from '@app/shared/service';

@Service({ global: true })
export class UserRepo {
  constructor(
    @Inject()
    private readonly loggerService: LoggerServiceHelper,
  ) {}

  public async getUserById(id: string): Promise<any> {
    try {
      return new Promise(resolve => {
        resolve({
          userId: id,
          name: 'name',
          email: 'email',
          image: 'image',
        });
      });
    } catch (error) {
      this.loggerService.error(error, 'UserRepo::getUserById', [id]);
    }
  }
}

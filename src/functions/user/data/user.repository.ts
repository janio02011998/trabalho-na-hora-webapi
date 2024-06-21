import { Service } from 'typedi';

import { UserEntity } from '@app/core';
import { UserRepository } from '@app/database';

@Service({ global: true })
export class UserRepo extends UserRepository {
  constructor() {
    super();
  }

  public async getUserById(id: string): Promise<UserEntity.Type | undefined> {
    try {
      return new Promise(resolve => {
        resolve({
          userId: id,
          userName: 'name',
          email: 'email',
          image: 'image',
        });
      });
    } catch (error) {
      this.loggerService.error(error, 'UserRepo::getUserById', [id]);
      return undefined;
    }
  }
}

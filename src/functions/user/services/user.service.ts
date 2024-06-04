import { Inject, Service } from 'typedi';

import { LoggerServiceHelper } from '@app/shared/service';

import { UserControllerDTO } from '../controllers/dto/user.dto';

@Service({ global: true })
export class UserService {
  constructor(
    @Inject()
    private readonly loggerService: LoggerServiceHelper,
  ) {}

  public async getUserById(
    userId: string,
  ): Promise<UserControllerDTO.Output.UserById> {
    return new Promise(resolve => {
      resolve({
        userId,
        name: 'name',
        email: 'email',
        image: 'image',
      });
    });
  }
}

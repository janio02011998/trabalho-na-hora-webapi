import { Get, JsonController, Param } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Inject } from 'typedi';

import {
  ApiResponse,
  GetResponseApi,
  GetResponseApiFalse,
} from '@app/shared/middleware';

import { UserService } from '../services/user.service';

import { UserControllerDTO } from './dto/user.dto';

@JsonController()
@OpenAPI({ tags: ['UserController'] })
export class UserControllerAuthorized {
  constructor(
    @Inject()
    private readonly userService: UserService,
  ) {}

  @OpenAPI({
    visible: true,
    description: `Should return list of user`,
  })
  @Get('/v1/user')
  public async getListUsers() {
    return ['user1', 'user2'];
  }
  @Get('/v1/user/:userId')
  public async getUserById(
    @Param('userId') userId: string,
  ): Promise<ApiResponse<UserControllerDTO.Output.UserById>> {
    try {
      const user = await this.userService.getUserById(userId);
      return GetResponseApi(user);
    } catch (error: any) {
      return GetResponseApiFalse([error.message]);
    }
  }
}

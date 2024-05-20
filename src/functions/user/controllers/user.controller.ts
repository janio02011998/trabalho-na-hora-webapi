import { Get, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@JsonController()
@OpenAPI({ tags: ['UserController'] })
export class UserControllerAuthorized {
  constructor() {}

  @OpenAPI({
    visible: true,
    description: `Should return list of user`,
  })
  @Get('/v1/user')
  public async getListUsers() {
    return ['user1', 'user2'];
  }
}

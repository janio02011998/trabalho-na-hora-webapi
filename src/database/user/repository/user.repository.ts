import 'reflect-metadata';
import { Service } from 'typedi';

import { UserEntity } from '@app/core';
import { BaseRepository } from '@app/database/base/base-repository';

import { UserDatabase } from '../user.database';

interface DTO extends UserEntity.Type {}

@Service({ global: true })
export class UserRepository extends BaseRepository<DTO> {
  constructor() {
    super(new UserDatabase());
  }
}

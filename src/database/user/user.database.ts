import { Schema } from 'mongoose';

import { UserEntity } from '@app/core';

import { IDatabase } from '../base';

interface DTO extends UserEntity.Type {}

export class UserDatabase implements IDatabase<DTO> {
  public keyId = 'userId';
  public collectionName = 'users';

  public schema = new Schema<DTO>({});

  public index = async () => {
    this.schema
      .index(
        { userId: 1 },
        {
          unique: true,
          background: true,
          name: 'userId-unique',
        },
      )
      .index(
        { email: 1 },
        {
          unique: true,
          background: true,
          name: 'email',
        },
      );
  };
}

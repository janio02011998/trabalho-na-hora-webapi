import { Schema } from 'mongoose';

import {
  USER_EMAIL_MAX_LENGTH,
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_LENGTH,
  UserEntity,
} from '@app/core';
import { getMongoConnection } from '@app/shared';

import { IDatabase } from '../base';

interface DTO extends UserEntity.Type {}

export class UserDatabase implements IDatabase<DTO> {
  public keyId = 'userId';
  public collectionName = 'users';

  public getModel = async () => {
    const mongoConnection = await getMongoConnection();
    const model = mongoConnection.model<DTO>(this.collectionName, this.schema);

    return model;
  };

  public schema = new Schema<DTO>({
    userId: {
      type: String,
      immutable: true,
    },

    email: {
      type: String,
      required: [true, 'NOT_EMPTY'],
      max: USER_EMAIL_MAX_LENGTH,
    },

    userName: {
      type: String,
      required: [true, 'NOT_EMPTY'],
      max: USER_NAME_MAX_LENGTH,
      min: [USER_NAME_MIN_LENGTH, 'NAME_MIN_LENGTH_3'],
    },

    password: {
      type: String,
      required: false,
      min: USER_PASSWORD_LENGTH,
      max: USER_PASSWORD_LENGTH,
    },

    image: {
      type: String,
      required: false,
    },
  });

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

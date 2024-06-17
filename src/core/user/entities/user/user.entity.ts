import { BaseEntity } from '@app/core/base/base.entity';

export namespace UserEntity {
  export type Type = {
    /**
     *  @description Registry ID ID
     */
    userId: string;

    /**
     *  @description User Email
     */
    email: string;

    /**
     *  @description User Full Name
     */
    userName: string;

    /**
     *  @description User password encrypted in Sha256
     */
    password?: string;

    /**
     *  @description User image URL
     */
    image?: string;
  } & BaseEntity;
}

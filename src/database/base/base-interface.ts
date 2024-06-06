import { Model, Schema } from 'mongoose';

export interface IDatabase<DTO> {
  /**
   * @description Collection primary key name that will receive a new guid
   */
  keyId: string | undefined;

  /**
   * @description Identification in the Name of the Table/Collection
   */
  collectionName: string;

  /**
   * @descriptionReference to the data scheme, based on the DTO
   */
  schema: Schema<
    DTO,
    Model<DTO, any, any, any, any>,
    object,
    object,
    object,
    object,
    'type',
    { [x: string]: any }
  >;

  /**
   * @description Performs the validation of the indices of a collection
   */
  index: () => Promise<void>;

  getModel?: () => Promise<Model<DTO, object, object, object, any>>;

  config?: {
    /**
     * @description Allows you to disable the automatic generation of ID
     */
    disableAutoGenerateId?: boolean;

    /**
     * @description Allows you to disable the registration creation date
     */
    disableCreatedAt?: boolean;

    /**
     * @description Allows you to disable the registration update date
     */
    disableUpdatedAt?: boolean;
  };
}

export namespace UserControllerDTO {
  export namespace Input {}

  export namespace Output {
    export type UserById = {
      userId: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

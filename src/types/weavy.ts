export enum AppTypeGuid {
  Chat = "d65dd4bc-418e-403c-9f56-f9cf4da931ed",
  Comments = "88f96a08-c6c1-4eac-a0bd-5bf8fba1a3fd",
  Files = "523edd88-4bbf-4547-b60f-2859a6d2ddc1",
  Posts = "5ebfa152-de85-48da-82dd-30a1b560c313",
  ChatRoom = "edb400ac-839b-45a7-b2a8-6a01820d1c44",
  PrivateChat = "7e14f418-8f15-46f4-b182-f619b671e470",
  BotChat = "2352a1c6-abc6-420e-8b85-ca7d5aed8779",
}

export type EntityType = {
  detail: {
    id: number;
    type: "app" | "file" | "message" | "user" | "comment" | "post";
    app: {
      id: number;
      type?: AppTypeGuid;
      uid?: string;
    };
    parent?: EntityType;
  }
};
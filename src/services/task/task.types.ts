import type { IEntity } from "../sub-types";

export enum Create {
  title = "title",
  description = "description",
  deadline = "deadline",
  users_id = "users_id",
  status = "status",
}

export interface CreateInput {
  [Create.title]: string;
  [Create.description]: string;
  [Create.deadline]: string;
  [Create.users_id]: number[];
  [Create.status]?: number;
}

export interface DeleteInput {
  id: string | number;
}

export interface UpdateInput {
  id: string | number;
}

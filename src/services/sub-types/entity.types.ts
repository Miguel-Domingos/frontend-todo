export enum Entity {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}

export interface IEntity {
  [Entity.id]: string;
  [Entity.createdAt]: Date;
  [Entity.updatedAt]: Date;
}

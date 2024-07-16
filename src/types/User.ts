export interface IUser {
  id: number | string;
  name: string;
  email: string;
  admin: number | boolean;
  created_at: string;
  updated_at: string;
}

export interface IAuthenticatedUser {
  token: string;
  user: IUser;
}

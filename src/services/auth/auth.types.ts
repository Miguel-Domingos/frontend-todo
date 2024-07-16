export enum Login {
  email = "email",
  password = "password",
}

export interface LoginInput {
  [Login.email]: string;
  [Login.password]: string;
}

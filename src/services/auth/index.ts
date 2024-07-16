import { makePostRequest } from "../http/post";
import type { Api } from "../services.types";
import type { LoginInput } from "./auth.types";

const AUTH_URL = "/api/v1/auth";
export const makeAuthService = (api: Api) => ({
  login: makePostRequest<LoginInput>(AUTH_URL + "/login", api),
});

import { makeGetRequest } from "../http/get";
import { makePostRequest } from "../http/post";
import type { Api } from "../services.types";
import type { CreateInput } from "./user.types";

const User_URL = "/api/v1/users";

export const makeUserService = (api: Api) => ({
  create: makePostRequest<CreateInput>(User_URL + "/create", api),
  getAll: makeGetRequest(User_URL, api),
  getAllMininal: makeGetRequest(User_URL + "/minimal", api),
  getMyAllTasks: (id: string | number) =>
    makeGetRequest(User_URL + `/${id}/tasks`, api)(),
});

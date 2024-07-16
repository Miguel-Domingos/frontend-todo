import { makeDeleteRequest } from "../http/delete";
import { makeGetRequest } from "../http/get";
import { makePostRequest } from "../http/post";
import { makePutRequest } from "../http/put";
import type { Api } from "../services.types";
import type { CreateInput, DeleteInput, UpdateInput } from "./task.types";

const Task_URL = "/api/v1/tasks";

export const makeTaskService = (api: Api) => ({
  create: makePostRequest<CreateInput>(Task_URL + "/create", api),
  getAll: makeGetRequest(Task_URL, api),
  delete: makeDeleteRequest<DeleteInput>(Task_URL + "/delete", api),
  update: makePutRequest<UpdateInput, Partial<CreateInput>>(
    Task_URL + "/update",
    api
  ),
});

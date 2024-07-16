import { AxiosConfig } from "./config";
import { makeAuthService } from "./auth";
import { makeUserService } from "./user";
import { makeTaskService } from "./task";

export default {
  auth: makeAuthService(AxiosConfig),
  user: makeUserService(AxiosConfig),
  task: makeTaskService(AxiosConfig),
};

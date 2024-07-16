import router from "@/router";
import { defineStore } from "pinia";
import type { IUser, IAuthenticatedUser } from "@/types";

const userSchema: IUser = {
  id: "",
  name: "",
  email: "",
  admin: false,
  created_at: "",
  updated_at: "",
};

export const useAuthStore = defineStore("auth", {
  state: (): IAuthenticatedUser => ({
    token: "",
    user: {
      ...userSchema,
    },
  }),
  actions: {
    register(data: IAuthenticatedUser) {
      this.token = data.token;
      this.user = { ...userSchema, ...data.user };
    },
    reset() {
      this.token = "";
      this.user = { ...userSchema };
      router.push("/");
    },
  },
  persist: true,
});

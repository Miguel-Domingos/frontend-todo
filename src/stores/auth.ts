import router from "@/router";
import { defineStore } from "pinia";

interface IUser {
  id: number | string;
  name: string;
  email: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
}

interface IAuthenticatedUser {
  token: string;
  user: {};
}

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

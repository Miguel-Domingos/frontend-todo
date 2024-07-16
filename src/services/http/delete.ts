import { AxiosError, type AxiosRequestConfig } from "axios";
import type { Api } from "../services.types";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import type { DeleteInput } from "../task/task.types";

export function makeDeleteRequest<I>(
  path: string,
  api: Api,
  configs?: AxiosRequestConfig
) {
  const { token } = storeToRefs(useAuthStore());
  return async ({ id }: DeleteInput) => {
    try {
      const response = await api.delete(path + "/" + id, {
        ...configs,
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as AxiosError).isAxiosError
          ? (error as AxiosError).response?.data
          : (error as any),
      };
    }
  };
}

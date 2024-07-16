import { AxiosError, type AxiosRequestConfig } from "axios";
import type { Api } from "../services.types";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";

export function makeGetRequest(
  path: string,
  api: Api,
  configs?: AxiosRequestConfig
) {
  const { token } = storeToRefs(useAuthStore());
  return async () => {
    try {
      const response = await api.get(path, {
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

import { useAuthStore } from "@/stores";
import type { NavigationGuardWithThis } from "vue-router";

const RouterGuard: NavigationGuardWithThis<void> = (to, from, next) => {
  const token = useAuthStore().token;
  const isAdmin = useAuthStore().user.admin;

  if (!to.meta.requireAuth && token) {
    next({ name: "app" });
  } else if (to.meta.admin && isAdmin == 0) {
    next({ name: "app" });
  } else if (to.meta.requireAuth && !token) {
    next({ name: "auth:login" });
  } else {
    next();
  }
};

export default RouterGuard;

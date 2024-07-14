import { createRouter, createWebHistory } from "vue-router";
import RouterGuard from "@/middleware/RouterGuard.global";
import NotFound from "@/views/404.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/app/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/login.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      redirect: "/admin/users",
      children: [
        {
          path: "users",
          name: "admin:users",
          component: () => import("@/views/app/users.vue"),
        },
        {
          path: "tasks",
          name: "admin:tasks",
          component: () => import("@/views/app/tasks.vue"),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

router.beforeResolve((to, from, next) => RouterGuard(to, from, next));
export default router;

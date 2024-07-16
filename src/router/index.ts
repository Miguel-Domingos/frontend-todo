import { createRouter, createWebHistory } from "vue-router";
import RouterGuard from "@/middleware/RouterGuard.global";
import NotFound from "@/views/404.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "app",
      component: () => import("@/views/app/index.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/login",
      name: "auth:login",
      component: () => import("@/views/auth/login.vue"),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/logout",
      name: "auth:logout",
      meta: {
        requireAuth: true,
      },
      component: () => import("@/views/auth/logout.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      redirect: "/admin/users",
      meta: {
        requireAuth: true,
        admin: true,
      },
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

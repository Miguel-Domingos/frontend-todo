import type { NavigationGuardWithThis } from "vue-router";

const RouterGuard: NavigationGuardWithThis<void> = (to, from, next) => {
  console.log(to.name);
  next();
};

export default RouterGuard;

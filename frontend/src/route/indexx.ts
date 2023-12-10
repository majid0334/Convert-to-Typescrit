// router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Log from "../views/Log.vue";
import TaskList from "../views/TaskList.vue";
import HomePage from "../views/HomePage.vue";
import { useAuthStore } from "../store/auth";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: HomePage },
  { path: "/log", component: Log },
  {
    path: "/taskList",
    component: TaskList,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth) {
    // Check if the route requires authentication
    if (authStore.isLoggedIn) {
      // User is logged in, proceed to the route
      next();
    } else {
      // User is not logged in, redirect to login
      next("/log");
    }
  } else {
    // Route doesn't require authentication, proceed
    next();
  }
});

export default router;

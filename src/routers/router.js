import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/course",
      component: () => import("../pages/coursePage.vue"),
    },
    {
        path: "/login",
        component: () => import("../pages/loginPage.vue"),
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router; 
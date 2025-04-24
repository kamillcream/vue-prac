import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/course",
      component: () => import("../pages/coursePage.vue"),
    },
    {
        path: "/hello",
        component: () => import("../components/hello.vue"),
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router; 
import { Component } from "react";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: "/course",
      Component: () => import("../components/test.vue"),
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router; s
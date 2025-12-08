import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/lib/supabaseClient";

const routes = [
  {
    path: '/', 
    redirect: '/signin',
  },
  {
    path: '/signin', 
    name: 'sign-in', 
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: '/signup', 
    name: 'sign-up', 
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: '/list', 
    name: 'posts', 
    component: () => import("@/views/Posts.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: '/list/:id', 
    name: 'post-details', 
    component: () => import("@/views/PostDetails.vue"),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const response = await supabase.auth.getUser()
  const user = response.data.user
  if (to.meta.requiresAuth && (!user || user.email_confirmed_at === null)) {
    return { name: 'sign-in' }
  }
})

export default router
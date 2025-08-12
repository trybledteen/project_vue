import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TodoList from '@/components/TodoList.vue'
import About from '@/views/About.vue'

const router = createRouter ({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/todos',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})

export default router
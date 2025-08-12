import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import TodoList from '@/components/TodoList.vue'
import About from '@/views/About.vue'
import TaskDetails from '@/components/TaskDetails.vue'

const router = createRouter({
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
      path: '/task/:id',
      name: 'TaskDetails',
      component: TaskDetails,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
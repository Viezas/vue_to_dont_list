import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import Task from '../views/Task.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Me from '../views/Me.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks,
    beforeEnter: (to, from, next) => {
      if(!store.getters.user.token)
      {
        return next({name : 'Login'})
      }
      next()
    }
  },
  {
    path: '/Tasks',
    name: 'Task',
    component: Task,
    beforeEnter: (to, from, next) => {
      if(!store.getters.user.token)
      {
        return next({name : 'Login'})
      }
      next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.getters.user.token)
      {
        return next({name : 'Tasks'})
      }
      next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(store.getters.user.token)
      {
        return next({name : 'Tasks'})
      }
      next()
    }
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
    beforeEnter: (to, from, next) => {
      if(!store.getters.user.token)
      {
        return next({name : 'Login'})
      }
      next()
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

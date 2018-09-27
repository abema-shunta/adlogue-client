import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NotFound from '@/components/NotFound'
import Buyers from '@/components/dashboard/Buyers'
import Login from '@/components/Login'
import auth from '@/auth'


Vue.use(Router)

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth, 
      children: [
        {
          path: '', 
          redirect: '/dashboard/buyers'
        },
        {
          path: 'buyers',
          component: Buyers
        }
      ]
    }, 
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: Login },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    },
    { path: '*', component: NotFound }
  ]
})
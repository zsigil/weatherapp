import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountryView from '../views/CountryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/covidcases/:country',
      name: 'country',
      component: CountryView,
      meta: {
        title: 'Country'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.params.country ?? to.meta.title}`
  next()
})

export default router

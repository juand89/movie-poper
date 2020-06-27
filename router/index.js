import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/pages/Search'
import Movie from '@/pages/Movie'
import Favorites from '@/pages/Favorite'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'list',
      component: Search,
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: Movie,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites,
    }
  ],
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Search from '@/pages/Search'
Vue.use(VueRouter)
axios.defaults.baseURL =
  'https://api.themoviedb.org/3/'
export default new VueRouter({ 
  routes: [{
    path: '/',
    name: 'list',
    component: Search
  }]
})
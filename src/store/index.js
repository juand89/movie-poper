import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const API_KEY = '084ec3ab6e0e6458a794cbb76c41fba4'
import router from '../../router'
Vue.use(Vuex)
axios.defaults.baseURL = 'https://api.themoviedb.org/3/'
export const store = new Vuex.Store({
  state: {
    movies: [],
    movie: {},
    favorites: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
    query: '',
    scroll_position: 0,
    scroll_position_fav: 0,
    loader: false,
  },
  actions: {
    async fetchDiscoverMovies({ state, commit }) {
      try {
        commit('toggleLoader')
        const response = await axios.get(
          `discover/movie?api_key=${API_KEY}&page=${state.page}`
        )
        commit('setMovies', response.data)
        commit('setTotalPages', response.data.total_pages)
        if (state.page < response.data.total_pages) commit('incrementPage')
        // use set time out to show loading animation on fast network
        setTimeout(() => {
          commit('toggleLoader')
        }, 1000)
      } catch (err) {
        commit('toggleLoader')
        console.error(err)
      }
    },
    async searchMovies({ state, commit }) {
      try {
        const response = await axios.get(
          `search/movie?api_key=${API_KEY}&query=${state.query}&page=${state.page}`
        )
        commit('setMovies', response.data)
        commit('setTotalPages', response.data.total_pages)
        commit('setTotalResults', response.data.total_results)
        if (state.page < response.data.total_pages) commit('incrementPage')
      } catch (err) {
        console.error(err)
      }
    },
    async fetchDetailsMovie({ commit }, id) {
      try {
        commit('toggleLoader')
        const response = await axios.get(`movie/${id}?api_key=${API_KEY}`)
        commit('setMovie', response.data)
        // use set time out to show loading animation on fast network
        setTimeout(() => {
          commit('toggleLoader')
        }, 250)
      } catch (err) {
        // use set time out to show loading animation on fast network
        setTimeout(() => {
          commit('toggleLoader')
        }, 250)
        if (err.response.status === 404) {
          router.push({ path: '/404', status: 404 })
        }
        console.error(err)
      }
    },
  },
  mutations: {
    incrementPage(state) {
      state.page++
    },
    resetPage(state) {
      state.page = 1
    },
    toggleLoader(state) {
      state.loader = !state.loader
    },
    setMovies(state, payload) {
      if (state.page === 1) {
        state.movies = payload.results
      } else {
        state.movies = Array.from(new Set(state.movies.concat(payload.results)))
      }
    },
    setScrollPosition(state, position) {
      state.scroll_position = position
    },
    setScrollPositionFav(state, position) {
      state.scroll_position_fav = position
    },
    addFavorites(state) {
      state.favorites = JSON.parse(localStorage.getItem('favorites'))
    },
    setFavorite(state, payload) {
      state.favorites.push(payload)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    removeFavorite(state, movieId) {
      const index = state.favorites
        .map((favorite) => favorite.id)
        .indexOf(movieId)
      state.favorites.splice(index, 1)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    setQuery(state, query) {
      state.query = query
    },
    setMovie(state, payload) {
      state.movie = payload
    },
    setTotalPages(state, payload) {
      state.total_pages = payload
    },
    setTotalResults(state, payload) {
      state.total_results = payload
    },
    resetMovie(state) {
      state.movie = {}
    },
    resetTotalResults(state) {
      state.total_results = 0
    },
    resetQuery(state) {
      state.query = ''
    }
  },
})

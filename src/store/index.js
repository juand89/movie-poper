import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const API_KEY = '084ec3ab6e0e6458a794cbb76c41fba4'
// import router from '../../router'
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
        setTimeout(() => {
          commit('toggleLoader')
        }, 250)
      } catch (err) {
        setTimeout(() => {
          commit('toggleLoader')
        }, 250)
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
        state.movies = state.movies.concat(payload.results)
      }
    },
    setScrollPosition(state, position) {
      state.scroll_position = position
    },
    setFavorite(state, payload) {
      state.favorites.push(payload)
    },
    removeFavorite(state, movieId) {
      const index = state.favorites
        .map((favorite) => favorite.id)
        .indexOf(movieId)
      state.favorites.splice(index, 1)
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

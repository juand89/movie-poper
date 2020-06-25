import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const API_KEY = '084ec3ab6e0e6458a794cbb76c41fba4'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    movies: [],
    favorites: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
  },
  actions: {
    async fetchDiscoverMovies({ state, commit }) {
      try {
        const response = await axios.get(
          `discover/movie?api_key=${API_KEY}&page=${state.page}`
        )
        commit('setMovies', response.data)
        commit('setTotalPages', response.data.total_pages)
        commit('setTotalResults', response.data.total_results)
        if (state.page < response.data.total_pages) commit('incrementPage')
      } catch (err) {
        console.error(err)
      }
    },
    async searchMovies({ state, commit }, query) {
      try {
        const response = await axios.get(
          `search/movie?api_key=${API_KEY}&query=${query}&page=${state.page}`
        )
        commit('setMovies', response.data)
        commit('setTotalPages', response.data.total_pages)
        commit('setTotalResults', response.data.total_results)
        if (state.page < response.data.total_pages) commit('incrementPage')
      } catch (err) {
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
    setMovies(state, payload) {
      state.movies = payload.results
    },
    setTotalPages(state, payload) {
      state.total_pages = payload
    },
    setTotalResults(state, payload) {
      state.total_results = payload
    },
  },
})

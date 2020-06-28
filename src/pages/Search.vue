<template>
  <div v-if="movieList.length">
    <MovieList title="Discover Movies" :movieList="movieList" />
  </div>
  <NoContent
    v-else-if="!movieList.length && searchQuery"
    iconName="mdi-magnify"
    title="No results found."
    content="No movies found for "
  />
</template>
<script>
import MovieList from '../components/MovieList'
import NoContent from '../components/NoContent'
export default {
  components: {
    MovieList,
    NoContent,
  },
  computed: {
    movieList() {
      return this.$store.state.movies
    },
    searchQuery() {
      return this.$store.state.query
    },
  },
  mounted() {
    if (!this.movieList.length && !this.searchQuery) {
      this.$store.dispatch('fetchDiscoverMovies')
    }
    if (localStorage.getItem('favorites') && !this.movieList.length ) {
      this.$store.commit('addFavorites')
    }
    this.$nextTick(() => {
      if (this.$store.state.scroll_position) {
        document
          .getElementById('scroll')
          .scrollTo(0, this.$store.state.scroll_position)
      }
    })
  },
}
</script>

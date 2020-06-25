<template>
  <div>
    <MovieList title="Discover Movies" :movieList="movieList" />
  </div>
</template>
<script>
import MovieList from '../components/MovieList'
export default {
  components: {
    MovieList,
  },
  computed: {
    movieList() {
      return this.$store.state.movies
    },
  },
  mounted() {
    this.$store.dispatch('fetchDiscoverMovies')
  }
}
</script>

<template>
  <div>
    <MovieList title="Favorite Movies" :movieList="movieList" />
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
      return this.$store.state.favorites
    },
  },
}
</script>

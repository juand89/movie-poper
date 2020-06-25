<template>
  <div>
    <v-container>
      <h1 class="p-1">
        {{ title }}
      </h1>
      <h3 v-if="searchResults">Search Results: {{ searchResults }}</h3>
      <v-layout row justify-space-evenly>
        <MovieListItem
          v-for="movie in movieList"
          :key="movie.id"
          :movie="movie"
        />
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import MovieListItem from './MovieListItem'
export default {
  components: {
    MovieListItem,
  },
  computed: {
    searchResults() {
      return this.$store.state.total_results
    },
  },
  props: {
    movieList: {
      type: Array,
      default: () => [],
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

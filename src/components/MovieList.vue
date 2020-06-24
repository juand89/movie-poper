<template>
  <div>
    <p class="p-1 text-center text-info">
      {{ title }}
    </p>
    <v-container fluid>
      <v-row dense>
        <MovieListItem v-for="movie in movieList" :key="movie.id" />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import MovieListItem from './MovieListItem'
export default {
  components: {
    MovieListItem,
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
  data() {
    return {
      list: [],
    }
  },
  mounted() {
  },
}
</script>

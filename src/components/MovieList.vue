<template>
  <div
    id="scroll"
    class="px-3 overflow-y-scroll bg-white"
    data-cy="scroll"
    @scroll="infiniteScroll"
    :style="{ height: innerHeight - 70 + 'px' }"
  >
    <v-container>
      <h1 class="p-1">
        {{ title }}
      </h1>
      <h3 v-if="searchResults && $route.name === 'list'">
        Search Results: {{ searchResults }}
      </h3>
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
      innerHeight: 0,
      scrollY: 0,
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.total_results
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    async infiniteScroll() {
      if (
        event.target.scrollTop + event.target.offsetHeight >=
          event.target.scrollHeight - 150 &&
        !this.$store.state.loader
      ) {
        if (this.searchResults) {
          this.$store.commit('toggleLoader')
          this.$store.dispatch('searchMovies')
          setTimeout(() => {
            this.$store.commit('toggleLoader')
          }, 1000)
        } else {
          this.$store.dispatch('fetchDiscoverMovies').then(() => {
          })
        }
      }
    },
    handleResize() {
      this.innerHeight = window.innerHeight
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>
<style>
#scroll {
  overflow-y: scroll;
}
</style>

<template>
  <div
    id="scroll"
    class="px-3 overflow-y-scroll bg-white"
    @scroll="infiniteScroll"
    :style="{ height: innerHeight - 65 + 'px' }"
  >
    <v-container>
      <div class="position-title">
        <h1 v-if="!searchResults" class="p-1">
          {{ title }}
        </h1>
        <h2 v-if="searchResults && $route.name === 'list'">
          Search Results: {{ searchResults.toLocaleString('en') }}
        </h2>
      </div>
      <v-divider />
      <v-layout class="margin-list" row justify-space-evenly>
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
    async infiniteScroll(event) {
      this.scrollY = document.getElementById('scroll').scrollTop
      if (
        event.target.scrollTop + event.target.offsetHeight >=
          event.target.scrollHeight - 150 &&
        !this.$store.state.loader &&
        this.$route.name === 'list'
      ) {
        if (this.searchResults) {
          this.$store.commit('toggleLoader')
          this.$store.dispatch('searchMovies')
          setTimeout(() => {
            this.$store.commit('toggleLoader')
          }, 1000)
        } else {
          this.$store.dispatch('fetchDiscoverMovies')
        }
      }
    },
    handleResize() {
      this.innerHeight = window.innerHeight
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.title === 'Discover Movies') {
      this.$store.commit('setScrollPosition', this.scrollY)
    } else {
      this.$store.commit('setScrollPositionFav', this.scrollY)
    }
  },
}
</script>
<style>
#scroll {
  overflow-y: scroll;
}
.margin-list {
  margin-top: 50px;
}
.position-title {
  position: fixed;
  background-color: white;
  z-index: 100;
  padding-top: 12px;
  padding-bottom: 10px;
  margin-left: -10px;
  width: inherit;
  top: 64px;
}
@media screen and (max-width: 960px) {
  .position-title {
    top: 56px;
  }
}
</style>

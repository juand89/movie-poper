<template>
  <v-flex md3 sm4 lg3 xl2 xs6>
    <v-hover>
      <template v-slot="{ hover }">
        <v-card
          :elevation="hover ? 16 : 3"
          color="indigo lighten-5"
          class="ma-2"
        >
          <v-img
            :lazy-src="require('../assets/blur-img.png')"
            transition="fade"
            :aspect-ratio="0.7"
            @click="onMovieSelect"
            :src="getMoviePicture"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            class="white--text align-end items-center"
          >
            <v-card-title class="break-words" v-text="movie.title"></v-card-title>
          </v-img>
          <v-card-actions>
            <span>{{ getFomatDate }}</span>
            <v-spacer></v-spacer>
            <span class="pr-1">{{ movie.vote_average }}</span>
            <v-icon color="yellow darken-2">mdi-star-circle</v-icon>
            <FavoriteIcon :movie="movie" />
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
  </v-flex>
</template>
<script>
import FavoriteIcon from '../components/FavoriteIcon.vue'
export default {
  components: {
    FavoriteIcon,
  },
  props: {
    movie: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    getFomatDate() {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      const date = new Date(this.movie.release_date)
      return date.toLocaleDateString('en-US', options)
    },
    getMoviePicture() {
      if (this.movie.poster_path)
        return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
      else if (this.movie.backdrop_path)
        return `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`
      else return require('../assets/poster-not-available.jpg')
    },
    getFavorite() {
      return this.$store.state.favorites.filter((f) => f.id === this.movie.id)
    },
  },
  methods: {
    onFavoriteMovie() {
      if (!this.getFavorite.length) {
        this.$store.commit('setFavorite', this.movie)
      } else {
        this.$store.commit('removeFavorite', this.movie.id)
      }
    },
    onMovieSelect() {
      if (
        this.$store.state.movie.id &&
        this.$store.state.movie.id !== this.movie.id
      ) {
        this.$store.commit('resetMovie')
      }
      this.$router.push(`/movie/${this.movie.id}`)
    },
  },
}
</script>

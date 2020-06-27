<template>
  <v-container justify-center>
    <v-layout wrap justify-center>
      <v-flex xl11 lg12 md12 sm12 xs12>
        <v-card color="blue-grey lighten-4">
          <v-card-actions class="blue-grey darken-2">
            <v-btn @click="$router.go(-1)" color="blue-grey darken-2" icon>
              <v-icon color="white">mdi-keyboard-backspace</v-icon>
            </v-btn>
            <v-spacer />
            <FavoriteIcon colorIcon="white" :movie="movie" />
          </v-card-actions>
          <v-divider />
          <v-layout wrap>
            <v-flex class="img-holder" xl4 lg5 md5 sm6 xs12>
              <img :src="getMoviePicture" />
            </v-flex>
            <v-flex xl8 lg7 md7 sm6 xs12 class="text-wrap">
              <v-card tile color="blue-grey darken-2">
                <v-card-title>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <span class="white--text font-weight-bold text-h4">
                        {{ movie.title }}
                        <span
                          class="grey--text text--lighten-1 text-h5 font-weight-bold"
                        >
                          {{ `(${getYear})` }}
                        </span>
                      </span>
                    </v-col>
                    <v-col cols="12">
                      <v-icon color="yellow darken-2">mdi-star</v-icon>
                      <span class="mx-1 white--text subtitle-2">
                        {{ `${movie.vote_average} (${movie.vote_count})` }}
                      </span>
                      <span class="mx-1 white--text subtitle-2">
                        |
                      </span>
                      <span class="white--text subtitle-2">
                        {{ getFormatRuntime }}
                      </span>
                      <span
                        v-if="getMovieGenres"
                        class="mx-1 white--text subtitle-2"
                      >
                        |
                      </span>
                      <span class="white--text  subtitle-2">
                        {{ getMovieGenres }}
                      </span>
                    </v-col>
                  </v-row>
                </v-card-title>
              </v-card>
              <v-layout justify-center mx-1 my-8>
                <v-flex xl11 lg10 md11 sm12 xs12>
                  <v-card-text class="text--primary">
                    <h2 class="pb-2">Overview</h2>
                    <p class="body-1 text-justify">
                      {{
                        movie.overview
                          ? movie.overview
                          : 'Overview not available'
                      }}
                    </p>
                    <h2 class="pb-2">Release</h2>
                    <v-flex row>
                      <v-icon class="pb-5 ml-2 mr-2">mdi-calendar</v-icon>
                      <p class="body-1 text-justify">
                        {{
                          movie.release_date
                            ? movie.release_date
                            : 'Date not available'
                        }}
                      </p>
                    </v-flex>
                    <h2 class="pb-2">Country</h2>
                    <v-flex row>
                      <v-icon class="pb-5 ml-2 mr-2">mdi-earth</v-icon>
                      <p class="body-1 text-justify">
                        {{ getMainProductionCountry }}
                      </p>
                    </v-flex>
                    <h2 class="pb-2">Languages</h2>
                    <v-flex row>
                      <v-icon class="pb-5 ml-2 mr-2">mdi-web</v-icon>
                      <p class="body-1 text-justify">
                        {{ getMovieLanguages }}
                      </p>
                    </v-flex>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import FavoriteIcon from '../components/FavoriteIcon.vue'
export default {
  components: {
    FavoriteIcon,
  },
  created() {
    this.$store.dispatch('fetchDetailsMovie', this.$route.params.id)
  },
  computed: {
    movie() {
      return this.$store.state.movie
    },
    getYear() {
      const date = new Date(this.movie.release_date)
      return date.getFullYear()
    },
    getFormatRuntime() {
      const hours = Math.floor(this.movie.runtime / 60)
      const minutes = this.movie.runtime % 60
      return `${hours}h ${minutes}min`
    },
    getMovieGenres() {
      if (this.movie.genres) {
        return Object.keys(this.movie.genres)
          .map((genre) => {
            return this.movie.genres[genre].name
          })
          .join(', ')
      }
      return ''
    },
    getMovieLanguages() {
      if (this.movie.spoken_languages.length) {
        return Object.keys(this.movie.spoken_languages)
          .map((lang) => {
            return this.movie.spoken_languages[lang].name
          })
          .join(', ')
      }
      return 'Languages not available'
    },
    getMainProductionCountry() {
      if (this.movie.production_countries.length) {
        return this.movie.production_countries[0].name
      }
      return 'Country not available'
    },
    getMoviePicture() {
      if (this.movie.poster_path)
        return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
      else if (this.movie.backdrop_path)
        return `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`
      else return require('../assets/poster-not-available.jpg')
    },
  },
}
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 600px) {
  .img-holder {
    height: 400px;
  }
}
</style>

<template>
  <v-app>
    <v-app-bar app elevate-on-scroll color="blue-grey lighten-2">
      <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-btn
            @click="scrollToTop()"
            class="mx-2"
            fab
            dark
            small
            color="gray"
          >
            <v-icon large color="orange">mdi-movie-roll</v-icon>
          </v-btn>
          <span :class="{ 'hidden-sm-and-down': $route.name === 'list' }">
            Movie Poper
          </span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-flex v-if="$route.name === 'list'" xs8 sm6 md3 lg2 class="mt-7">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          dense
          solo
          :loading="loading"
          color="blue-grey darken-2"
          clearable
          @click:clear="onClearSearch"
          @keydown.enter="onMovieSearch"
          label="Movie Name"
          v-model="searchMovie"
        ></v-text-field>
      </v-flex>
      <v-spacer class="hidden-md-and-up" />
      <v-btn
        v-if="$route.name !== 'favorites'"
        @click="onFavIconClick"
        class="mx-2"
        fab
        dark
        small
        color="red darken-1"
      >
        <v-icon dark>mdi-heart</v-icon>
      </v-btn>
      <v-progress-linear
        :active="loader"
        :indeterminate="true"
        height="5"
        absolute
        bottom
        color="blue accent-4"
      />
    </v-app-bar>
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      loading: false,
    }
  },
  computed: {
    searchMovie: {
      get() {
        return this.$store.state.query
      },
      set(value) {
        this.$store.commit('setQuery', value)
      },
    },
    loader() {
      return this.$store.state.loader
    },
  },
  methods: {
    onMovieSearch() {
      if (this.searchMovie && !this.loading) {
        this.scrollToTop()
        this.loading = true
        this.$store.commit('resetPage')
        this.$store.dispatch('searchMovies').then(() => {
          // use set time out to show loading animation on fast network
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
      }
    },
    onClearSearch() {
      this.loading = true
      // use set time out to show loading animation on fast network
      setTimeout(() => {
        this.$store.commit('resetQuery')
        this.$store.commit('resetPage')
        this.$store.commit('resetTotalResults')
        this.$store.dispatch('fetchDiscoverMovies').then(() => {
          this.loading = false
          this.scrollToTop()
        })
      }, 500)
    },
    scrollToTop() {
      this.$store.commit('setScrollPosition', 0)
      if (document.getElementById('scroll'))
        document.getElementById('scroll').scrollTo(0, 0)
    },
    onFavIconClick() {
      this.$store.commit('setScrollPositionFav', 0)
      this.$router.push({ path: '/favorites' })
    },
  },
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.break-words {
  word-break: break-word !important;
}
</style>

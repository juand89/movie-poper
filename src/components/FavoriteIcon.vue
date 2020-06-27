<template>
  <v-btn @click="onFavoriteMovie" icon color="pink">
    <v-icon v-if="!getFavorite.length" :color="colorIcon">mdi-heart-outline</v-icon>
    <v-icon v-else color="red">mdi-heart</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => {},
      required: true,
    },
    colorIcon: {
      type: String,
      default: 'black'
    }
  },
  computed: {
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
  },
}
</script>

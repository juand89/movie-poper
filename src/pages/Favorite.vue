<template>
  <div v-if="movieList.length">
    <MovieList title="Favorite Movies" :movieList="movieList" />
  </div>
  <NoContent
    v-else
    iconName="mdi-heart-broken"
    title="No Favorites Yet."
    content="When you find a movie that you like, click on the heart icon to see
            it here."
  />
</template>
<script>
import MovieList from '../components/MovieList'
import NoContent from '../components/NoContent'
export default {
  components: {
    MovieList,
    NoContent,
  },
  computed: {
    movieList() {
      return this.$store.state.favorites
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.scroll_position_fav) {
        document
          .getElementById('scroll')
          .scrollTo(0, this.$store.state.scroll_position_fav)
      }
    })
  }
}
</script>

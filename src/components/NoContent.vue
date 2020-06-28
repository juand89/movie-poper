<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-icon size="64" color="grey lighten-1">{{ iconName }}</v-icon>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <p class="text-h2 grey--text text--lighten-1 text-center">
            {{ title }}
          </p>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <p class="text-h6 grey--text text--lighten-1 text-center mx-2">
            {{ content }}
            <b v-if="$route.name === 'list'">
              {{ `"${this.$store.state.query}"` }}
            </b>
          </p>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        v-if="$route.name === 'list' || title === 'Page Not Found'"
      >
        <v-row align="center" justify="center">
          <v-btn @click="onDiscoverMovies">
            <v-icon color="grey ligthen-1" left>mdi-refresh</v-icon>
            <span class="grey--text text--dark-2">Back to Discover</span>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    iconName: {
      type: String,
      default: '',
      required: true,
    },
    title: {
      type: String,
      default: '',
      required: true,
    },
    content: {
      type: String,
      default: '',
      required: true,
    },
  },
  methods: {
    onDiscoverMovies() {
      if (this.title !== 'Page Not Found') {
        this.$store.commit('resetQuery')
        this.$store.dispatch('fetchDiscoverMovies')
      }
      this.$router.push('/')
    },
  },
}
</script>

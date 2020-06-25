<template>
  <v-app>
    <v-app-bar app elevate-on-scroll color="blue-grey lighten-2">
      <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-btn class="mx-2" fab dark small color="gray">
            <v-icon large color="orange">mdi-movie-roll</v-icon>
          </v-btn>
          <span class="hidden-sm-and-down">
            Movie Poper
          </span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-flex xs8 sm6 md3 lg2 class="mt-7">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          dense
          solo
          rounded
          theme-light
          clearable
          label="Movie Name"
          v-model="searchMovie"
        ></v-text-field>
      </v-flex>
      <v-spacer class="hidden-md-and-up" />
      <v-btn class="mx-2" fab dark small color="red darken-1">
        <v-icon dark>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      serachMovie: ''
    }
  }
}
</script>

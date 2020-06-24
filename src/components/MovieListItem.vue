<template>
  <v-col :cols="4">
    <v-card>
      <v-img :src="movie.poster_path" class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px">
        {{ movie.title }}
      </v-img>
    </v-card>
  </v-col>
</template>
<template>
  <v-container fill-height class="text-center">
    <v-col>
      <h1 class="display-2 mb-2">Whoops, 404</h1>
      <p>The page you were looking for does not exist</p>
      <v-btn color="primary" :to="{ name: 'Home' }">GO BACK HOME</v-btn>
    </v-col>
  </v-container>
</template>

<script>
export default {};
</script>
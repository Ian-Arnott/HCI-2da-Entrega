<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span>project</span>
        <span class="font-weight-light"> House</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="blue-grey" >
      <p>test</p>
    </v-navigation-drawer>

    <v-main>
      <!-- <WelcomePage/> -->
      <DeviceList/>
    </v-main>
  </v-app>
</template>

<script>
// import WelcomePage from './components/WelcomePage';
import DeviceList from './components/DeviceList';

export default {
  name: 'App',

  components: {
    // WelcomePage,
    DeviceList,
  },

  data(){
    return {
      drawer: false
    }
  }
};
</script>

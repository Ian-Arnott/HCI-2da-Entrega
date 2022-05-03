<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Project House
        </h1>

        <p class="subheading font-weight-regular">
          Manage your appliances from anywhere
        </p>
      </v-col>

      <!-- Email Form -->
      <v-col cols="12">
        <v-form v-model="valid" @submit.prevent>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <router-link
            class="text-decoration-none"
            v-show="valid"
            :to="{ name: 'Home', params: { username: email } }"
          >
            <v-btn
              depressed
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="validate"
            >
              GET STARTED
            </v-btn>
          </router-link>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginPage",

  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    validate() {
      //TODO router
      console.log("email is: " + this.email);
      this.isAuthenticated = true;
    },
  },
};
</script>
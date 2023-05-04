<template>
  <v-container>
    <v-card class="mx-auto mt-12" max-width="500px">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field label="Email" v-model="email" required></v-text-field>
          <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
          <v-btn color="primary" type="submit">Login</v-btn>
        </v-form>
        <v-snackbar v-model="snackbar" :color="error ? 'error' : 'success'" :timeout="3000">{{ message }}</v-snackbar>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      error: false,
      message: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:4000/users/authenticate', {
          email: this.email,
          password: this.password,
        });

        // Store the token in local storage
        localStorage.setItem('token', response.data.token);

        // Redirect to the dashboard page
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        this.error = true;
        this.message = 'Usuario o contraseña incorrectos';
        this.snackbar = true;
      }
    },
  },
};
</script>

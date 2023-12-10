<!-- components/Header.vue -->
<template>
  <header>
    <h1>Your App</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <br />
      <router-link v-if="!authStore.isLoggedIn" to="/log">Login</router-link>
      <button v-if="authStore.isLoggedIn" @click="logout">Logout</button>
    </nav>
  </header>
  <router-view />
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router"; // Import useRouter

const authStore = useAuthStore();
const router = useRouter(); // Use useRouter to get the router object

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

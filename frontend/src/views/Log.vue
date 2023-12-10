<!-- views/Login.vue -->
<template>
  <div>
    <h2>Login</h2>
    <button @click="login">Login</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router"; // Import useRouter

const authStore = useAuthStore();
const router = useRouter(); // Use useRouter to get the router object

const login = () => {
  authStore.login();
  router.push("/taskList"); // Navigate to the dashboard after login
};
</script>

<template>
  <div>
    <!-- <button @click="handleRegistration()">signup</button> -->
    <!-- <button @click="handleLoginEmail()">signin</button> -->
    <!-- <button @click="loginGoogle()">google</button> -->
    <button @click="logout()">logout</button>
    {{ token }}
  </div>
</template>
  
<script setup lang="ts">
const { loginGoogle, logout, user, token } = useFirebaseAuth()

definePageMeta({
  middleware: ['auth']
})

console.log(user)
</script>

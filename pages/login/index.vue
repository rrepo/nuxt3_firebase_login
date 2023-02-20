<template>
    <div>
        <h1>login</h1>
        <button @click="handleRegistration()">signup</button>
        <button @click="handleLoginEmail()">signin</button>
        <button @click="loginGoogle()">google</button>
        {{ token }}
    </div>
</template>
    
<script setup lang="ts">
definePageMeta({
    middleware: ['auth-login']
})

const { registerUser, loginEmail, loginGoogle, token } = useFirebaseAuth()

const creds = reactive({
    email: "testtest33@gmail.com",
    password: "testpass"
})

async function handleRegistration() {
    await registerUser(creds.email, creds.password)
}

async function handleLoginEmail() {
    await loginEmail(creds.email, creds.password)
}

</script>
  
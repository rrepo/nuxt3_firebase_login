<template>
  <div>
    <button @click="handleRegistration()">email</button>
    <button @click="login">google</button>
    <button @click="logout">logout</button>

    {{ isAuthed }}
</div>
</template>
  
<script setup lang="ts">
const { registerUser, user, login, logout, isAuthed } = useFirebaseAuth()

const creds = reactive({
  email: "testtest@gmail.com",
  password: "testpass"
})

async function handleRegistration() {
  await registerUser(creds.email, creds.password)
}

console.log("user", user)
console.log("user", isAuthed)

</script>

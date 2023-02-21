<template>
  <div>
    <button @click="logout()">logout</button>
    <p>{{ token }}</p>
  </div>
</template>
  
<script setup lang="ts">
import axios from "axios"
const { logout, token, checkAuthState, } = useFirebaseAuth()

definePageMeta({
  middleware: ['auth']
})

const myAsync = async (url: any) => {
  const response = await fetch(url);
  const data = await response.text()
  console.log(data);
}
myAsync('http://localhost:8000/public');

// const apiPrivate = async function () {
//   let res = await axios.get('http://localhost:8000/public')
//   console.log(res.data)
// }

await checkAuthState()

const apiPrivate = async function () {
  let res = await axios.get('http://localhost:8000/private', {
    headers: { 'Authorization': `Bearer ${token.value}` }
  })
  console.log(res.data)
}

apiPrivate()


</script>

<template>
  <div>
    <button @click="logout()">logout</button>
    <a href="mypage">mypage</a>

    <textarea v-model="textInput"></textarea>
    <button @click="send">send</button>

    <input placeholder="say something" id="text" type="text">

    <div v-if="postArr.length != 0">
      <div v-for="post in postArr" :key="post.id">
        <img :src="post.icon">{{ post.name }} {{ post.title }} {{ post.createdAt }}
      </div>
    </div>



  </div>
</template>

<script setup lang="ts">
const { logout, token, checkAuthState, } = useFirebaseAuth()

definePageMeta({
  middleware: ['auth']
})

await checkAuthState()

const { $sendPost, $getPost, $getUserByUID } = useNuxtApp()

const textInput = ref('');
const postRes: any = ref();
const postArr: any = ref([])

const send = async () => {
  // $sendPost(token, textInput.value)

  let json = JSON.stringify({
    "token": token.value,
    "title": textInput.value,
  })

  socket.value.send(json);
  textInput.value = ""
}


const getPost = async () => {
  const posts = await $getPost(token)
  postRes.value = posts
  postArr.value = []

  for (let index = 0; index < postRes.value.length; index++) {
    const e = postRes.value[index];
    const u = await $getUserByUID(token, e.UserUID)
    const date = new Date(e.CreatedAt)
    const hash: any = {
      id: e.ID,
      uid: e.UserUID,
      title: e.Title,
      name: u.Name,
      icon: `http://localhost:8002/static/${u.Img}.png`,
      createdAt: date,
    }
    postArr.value.push(hash)
  }
}
getPost()

// setInterval(getPost, 1000);

// const getUserByUID = async (uid: any) => {
//   const res = await $getUserByUID(token, uid)
//   return res
// }
// getUserByUID("MpKFbeWQB2X1QpND94eJSzJyO1D3")

let socket: any = ref()

onMounted(() => {
  // let socket = new WebSocket("ws://localhost:8001/ws");
  socket.value = new WebSocket("ws://localhost:8001/ws");

  socket.value.onopen = function (e: any) {
    console.log(e)
  };

  socket.value.onmessage = function (e: any) {
    let json = JSON.parse(e.data)
    if(json.status){
      console.log(json.status)
    }else{
      console.log(json)
    }
  };

  socket.value.onclose = function (e: any) {
    console.log(e.data)
    console.log("Close Code = " + e.code);
    console.log("Close Reason = " + e.reason);
  }

})

</script>

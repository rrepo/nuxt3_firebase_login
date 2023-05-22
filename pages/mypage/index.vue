<template>
    <div>
        <button @click="logout()">logout</button>
        <div>
            <textarea v-model="textInput"></textarea>
            <button @click="updateUser">send name</button>
        </div>

        <div>
            <p>{{ user }}</p>
            <img :src="image_src" >
        </div>

        <input type="file" id="file" name="file" accept="image/jpeg, image/png" @input="changeImg">
        <button @click="sendImg">send icon</button>

        <div>
            <img id="preview" @load="load" hidden>
            <canvas id="board" width="128" height="128"></canvas>

        </div>

    </div>
</template>
     
<script setup lang="ts">
const { logout, token, checkAuthState, } = useFirebaseAuth()

definePageMeta({
    middleware: ['auth']
})

await checkAuthState()
console.log(token.value)

const { $getUser, $updateUser, $updateImg } = useNuxtApp()

const textInput = ref('');
const user = ref(undefined)
const image_src = ref()

const getUser = async () => {
    const res = await $getUser(token)
    user.value = res
    image_src.value =`http://localhost:8002/static/${user.value.Img}.png`
}
getUser()


const updateUser = async () => {
    const res = await $updateUser(token, textInput.value)
    textInput.value = ""
    getUser()
}

const changeImg = () => {
    const preview: any = document.getElementById('preview');
    const input: any = document.getElementById("file");
    if (input.files) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
            preview.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

const load = () => {
    const input: any = document.getElementById("file");
    const preview: any = document.getElementById('preview');
    if (input.files) {
        const canvas: any = document.querySelector("#board");
        const ctx: any = canvas.getContext('2d');
        ctx.clearRect(0, 0, 128, 128);
        ctx.drawImage(preview, 0, 0, 128, 128);
    }
}

const sendImg = async () => {
    const canvas: any = document.querySelector("#board");

    canvas.toBlob(function (blob: any) {
        $updateImg(token, blob)
    })
    getUser()

    // const input: any = document.getElementById("file");
    // if (input.files) {
    //     $updateImg(token, input.files[0])
    // } else {
    //     console.log(false)
    // }
}
</script>
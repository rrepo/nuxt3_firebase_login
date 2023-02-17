import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics"

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: "AIzaSyBq6iQexIYGhHh5uIqn-vz3Eath3U95UEY",
        authDomain: "local-52d56.firebaseapp.com",
        projectId: "local-52d56",
        storageBucket: "local-52d56.appspot.com",
        messagingSenderId: "979768751860",
        appId: "1:979768751860:web:705672ab2905bbe3ebd0a1",
        measurementId: "G-8RZ0FWD1R2"
    };

    const app = initializeApp(firebaseConfig)

    const analytics = getAnalytics(app)
    const auth = getAuth(app)
    const firestore = getFirestore(app)

    console.log(auth)

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

    nuxtApp.vueApp.provide('firestore', firestore)
    nuxtApp.provide('firestore', firestore)
})
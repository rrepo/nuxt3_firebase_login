export default defineNuxtRouteMiddleware(async () => {
    if (!process.server) {
        const { token, checkAuthState } = useFirebaseAuth();
        await checkAuthState()
        console.log('token', token.value)
        if (token.value == null) {
            console.log("test")
            return await navigateTo("/login", { replace: true });
        }
        const to = useRoute().redirectedFrom?.fullPath || '/'
        navigateTo(to, { redirectCode: 302 })
    }
});
export default defineNuxtRouteMiddleware(async () => {
    if (!process.server) {
        const { token, checkAuthState} = useFirebaseAuth();
        await checkAuthState()
        console.log(token.value)
        console.log(token.value != null)
        if (token.value != null) {
            return await navigateTo("/", { replace: true });
        }
    }
});

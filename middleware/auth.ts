export default defineNuxtRouteMiddleware(async () => {
    if (!process.server) {
        const { token, checkAuthState } = useFirebaseAuth();
        await checkAuthState()
        if (token.value == null) {
            return await navigateTo("/login", { replace: true });
        }
    }
});
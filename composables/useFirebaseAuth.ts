import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    onAuthStateChanged,
} from 'firebase/auth'

export default function () {
    const { $auth } = useNuxtApp()

    const token: any = useState<string | null>("token", () => null)

    const user = useState<User | null>("fb_user", () => null)

    const registerUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const userCreds = await createUserWithEmailAndPassword($auth, email, password)
            if (userCreds) {
                user.value = userCreds.user
                return true
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                // handle error
            }
            return false
        }
        return false
    }

    const loginEmail = async (email: string, password: string): Promise<boolean> => {
        try {
            const userCreds = await signInWithEmailAndPassword($auth, email, password)
            if (userCreds) {
                user.value = userCreds.user
                toTop()
                return true
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                // handle error
            }
            return false
        }
        return false
    }

    async function loginGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup($auth, provider);
            toTop()
        } catch (error) {
            throw error;
        }
    }

    async function logout() {
        try {
            await signOut($auth);
            user.value = null;
            toLogin()
        } catch (error) {
            throw error;
        }
    }

    async function checkAuthState() {
        return await new Promise<void>((resolve, reject) => {
            if (process.server) return resolve()
            onAuthStateChanged($auth, (user) => {
                if (user) {
                    user.getIdToken().then((idtoken) => {
                        token.value = idtoken
                        resolve()
                    })
                        .catch(reject)
                } else {
                    token.value = null
                    resolve()
                }
            },
                (error) => {
                    reject(error)
                }
            )
        })
    }

    return {
        user,
        registerUser,
        loginEmail,
        loginGoogle,
        logout,
        checkAuthState,
        token,
    }
}

const toTop: any = () => {
    const to = useRoute().redirectedFrom?.fullPath || '/'
    navigateTo(to, { redirectCode: 302 })
}

const toLogin: any = () => {
    const to = useRoute().redirectedFrom?.fullPath || '/login'
    navigateTo(to, { redirectCode: 302 })
}
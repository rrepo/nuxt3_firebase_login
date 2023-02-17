import {
    createUserWithEmailAndPassword, User, GoogleAuthProvider, signInWithPopup, Auth, getAuth,
    onAuthStateChanged,signOut,
} from 'firebase/auth'


export default function (auth: Auth = getAuth()) {
    const { $auth } = useNuxtApp()
    const user = useState<User | null>("fb_user", () => null)
    const isAuthed = computed(() => !!user.value);

    auth.onIdTokenChanged((authUser) => (user.value = authUser));

    async function checkAuthState() {
        try {
            const _user = await _checkAuthState(auth);
            user.value = _user;
        } catch (error) {
            user.value = null;
        }
    }

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

    async function login() {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            throw error;
        }
    }

    async function logout() {
        try {
            await signOut(auth);
            user.value = null;
        } catch (error) {
            throw error;
        }
    }

    return {
        user,
        isAuthed,
        registerUser,
        login,
        logout,
        checkAuthState,
    }
}

async function _checkAuthState(auth: Auth) {
    return new Promise<User | null>((resolve, reject) => {
        // client only
        if (process.server) return resolve(null);
        onAuthStateChanged(
            auth,
            (user) => resolve(user || null),
            (error) => reject(error)
        );
    });
}
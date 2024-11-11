export const useAuth = () => {
    const authUser = useAuthUser();
    const isAuthenticating = ref(false);

    const isAuthenticated = computed(() => {
        const authToken = localStorage.getItem('authToken');
        const meUser = localStorage.getItem('isUserSet');
        return authToken !== null &&
            authToken !== 'null' &&
            authToken !== '' &&
            authToken !== 'undefined' &&
            authToken !== undefined &&
            meUser === 'true';
    });

    const setUser = (user) => {
        if (process.client && user && user.accessToken) {
            localStorage.setItem('authToken', user.accessToken);
        }
        authUser.value = user;  // Esto actualiza el estado directamente
        useCryptoStore().userBalance = user?.balance || 0.00;
    };

    const login = async ({
        username,
        password,
    }) => {
        isAuthenticating.value = true;
        try {
            const {error, data} = await useBaseFetch('/users/login', {
                method: 'POST',
                body: {username, password},
            });

            if (!error.value) setUser(data.value.data);

            // call me
            await me(data.value.data.accessToken);
            return {error, data};
        } finally {
            isAuthenticating.value = false;
        }
    };

    const logout = async () => {
        // TODO: Check how to use cookies instead of localStorage
        if (process.client) localStorage.setItem('authToken', null);
        if (process.client) localStorage.setItem('isUserSet', null);
        setUser(false);

        navigateTo('/');
    };

    const me = async (token) => {
        try {
            if (!!token && token !== 'null' && token !== 'undefined' && token !== '' && token !== null) {
                const {error, data} = await useBaseFetch('/users/me', {
                    method: 'GET',
                    headers: [
                        ['Authorization', `Bearer ${token}`],
                    ],
                });

                if (!error.value) {
                    setUser(data.value.data);
                    localStorage.setItem('isUserSet', 'true');
                }
            }
        } catch (error) {
            console.log(error);
        }
        return authUser;
    };

    return {
        login,
        isAuthenticated,
        logout,
        me,
        setUser,
        isAuthenticating
    };
};

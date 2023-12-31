export interface GlobalContextType {
    user: {token: string, refreshToken: string} | null,
    loading: boolean,
    setLoading: (flag: boolean) => void,
    setUser: (user:any) => void,
    setToastNotifications: (notification: {text: string}) => void,
    token: string,
    refreshToken: string,
    clearAsyncStorage: () => void,
    handleLogout: () => void,
    setToken: (token: string) => void,
    setRefreshToken: (token: string) => void,
    redirectURI: string,
    setRedirectURI: (token: string) => void,
}
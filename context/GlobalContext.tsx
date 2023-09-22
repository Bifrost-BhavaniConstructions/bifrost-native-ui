import React, {useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {GlobalContextType} from "../GlobalContextType";

export const GlobalContext = React.createContext<GlobalContextType>({
  user: null,
  loading: false,
  setLoading: (flag: boolean) => {console.log(flag)},
  setUser: (user:any) => {
    console.log(user)},
  setToastNotifications: (notification: {text: string}) => {
    console.log(notification)},
  token: '',
  refreshToken: '',
  clearAsyncStorage: () => {},
  handleLogout: () => {},
  setToken: (token: string) => {
    console.log(token)},
  setRefreshToken: (token: string) => {
    console.log(token)},
  redirectURI: '',
  setRedirectURI: (token: string) => {
    console.log(token)},
});

export const GlobalContextProvider = (props: any) => {
  const [user, setUser] = useState(null); //either in async storage or null
  const [loading, setLoading] = useState(false);
  const [redirectURI, setRedirectURI] = useState('');
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const response = await AsyncStorage.getItem('user');
      if (typeof response === "string") {
        setUser(JSON.parse(response));
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchToken() {
      const response = await AsyncStorage.getItem('token');
      if (typeof response === "string") {
        setToken(response);
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    async function fetchRefreshToken() {
      const response = await AsyncStorage.getItem('refreshToken');
      if (typeof response === "string") {
        setRefreshToken(response);
      }
    }
    fetchRefreshToken();
  }, []);

  const handleLoading = (flag: boolean) => {
    setLoading(flag);
  };

  const setToastNotifications = (notification: {text: string}) => {
    Toast.show(notification.text, 1); // Appearance: success, error, warning and info
  };

  const handleUser = (activeUser: any) => {
    AsyncStorage.setItem('user', JSON.stringify(activeUser));
    setUser(activeUser);
  };

  const handleToken = (tkn: string) => {
    console.log('token', tkn);
    AsyncStorage.setItem('token', tkn);
    setToken(tkn);
  };

  const handleRefreshToken = (tkn: string) => {
    AsyncStorage.setItem('refreshToken', tkn);
    setRefreshToken(tkn);
  };
  const handleRedirectURI = (uri: string) => {
    console.log('new redirect uri');
    setRedirectURI(uri);
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  const handleLogout = () => {
    clearAsyncStorage();
    handleUser(null);
    handleToken('');
    handleRefreshToken('');
  };

  const contextMemo= useMemo(() => ({
    user,
    loading,
    token,
    refreshToken,
    setLoading: handleLoading,
    setUser: handleUser,
    setToastNotifications: setToastNotifications,
    clearAsyncStorage,
    handleLogout,
    setToken: handleToken,
    setRefreshToken: handleRefreshToken,
    redirectURI,
    setRedirectURI: handleRedirectURI
  }), [
    user,
    loading,
    token,
    refreshToken,
    handleLoading,
      handleUser,
      setToastNotifications,
    clearAsyncStorage,
    handleLogout,
      handleToken,
      handleRefreshToken,
    redirectURI,
      handleRedirectURI,
  ]);

  return (
    <GlobalContext.Provider
      value={contextMemo}>
      {props.children}
    </GlobalContext.Provider>
  );
};

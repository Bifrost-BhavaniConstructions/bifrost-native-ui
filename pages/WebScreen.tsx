import {BackHandler, SafeAreaView} from 'react-native';
import React, {useContext, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {GlobalContext} from '../context/GlobalContext';
import {BASE_UI_URL} from "../constants/API";
import {StatusBar} from "expo-status-bar";

const WebScreen = () => {
    const globalContext = useContext(GlobalContext);

    const [redirect, setRedirect] = React.useState('');

    React.useEffect(() => {
        if (globalContext.redirectURI !== '') {
            setRedirect(globalContext.redirectURI);
        } else {
            setRedirect('');
        }
    }, [globalContext.redirectURI]);

    const webview = useRef<WebView>(null);
    const onAndroidBackPress = (): boolean => {
        if (webview.current) {
            webview.current.goBack();
            return true; // prevent default behavior (exit app)
        }
        return false;
    };
    React.useEffect((): (() => void) => {
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
        return (): void => {
            BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
        };
    }, []); // Never re-run this effect

    const debugging = `
     // Debug
     console = new Object();
     console.log = function(log) {
       window.ReactNativeWebView.postMessage(log);
     };
     console.debug = console.log;
     console.info = console.log;
     console.warn = console.log;
     console.error = console.log;
     `;

    return (
        <SafeAreaView style={{height: '100%'}}>
            <StatusBar backgroundColor="#000000" style="light"/>
            <WebView
                ref={webview}
                injectedJavaScript={debugging}
                onMessage={event => {
                    console.log(event.nativeEvent.data)
                }}
                onNavigationStateChange={state => {
                    console.log('current_path', state.url);
                    if (
                        state.url === `${BASE_UI_URL}/login`
                    ) {
                        globalContext.handleLogout();
                    }
                }}
                onLoadProgress={e => {
                    console.log('URL ', e.nativeEvent.url);
                    if (
                        e.nativeEvent.url === `${BASE_UI_URL}/login`
                    ) {
                        globalContext.handleLogout();
                    }
                }}
                source={{
                    uri:
                         redirect !== ''
                            ? redirect
                            : `${BASE_UI_URL}/login-redirect?token=${globalContext.user!.token}`,
                }}
            />
        </SafeAreaView>
    );
};

export default WebScreen;

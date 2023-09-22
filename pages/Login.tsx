import {Image, StyleSheet, Text, View} from 'react-native'
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {GlobalContext} from "../context/GlobalContext";
import {withAPIRequest} from '../hoc/WithAPIRequest';
import {useContext} from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {API, AXIOS_METHOD_TYPES} from "../constants/API";
import Input from "../components/Inputs";
import Button from "../components/Button";

const BIFROST_LOGO = require('../assets/bifrost-logo.png');


const LoginValidationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().min(4, 'Atleast 4 Character').required('Required'),
});
const Login = ({commonAPIRequest}: any) => {


    const globalContext = useContext(GlobalContext);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: LoginValidationSchema,
        onSubmit: values => {
            console.log('values', values);
            callLoginApi(values);
        },
    });

    const callLoginApi = (values: {username: string, password: string}) => {
        let serviceParams = {
            api: API.LOGIN,
            method: AXIOS_METHOD_TYPES.POST,
            data: {
                username: values.username,
                password: values.password,
            },
        };
        globalContext.setLoading(true);
        commonAPIRequest(serviceParams, async (result: any) => {
            if (result) {
                globalContext.setLoading(false);
                console.log('result', result);
                if (result.token) {
                    globalContext.setUser(result);
                    globalContext.setToken(result.token);
                    globalContext.setRefreshToken(result.refreshToken);
                } else {
                  globalContext.setToastNotifications({
                    text: result?.response?.data?.message,
                  });
                }
            }
        });
    };


    return (
        <View style={styles.container}>
            <SafeAreaView style={{height: '100%', width: '100%'}}>
                <KeyboardAwareScrollView bounces={false} keyboardShouldPersistTaps='handled' contentContainerStyle={{height: '100%', width: '100%'}}>
                    <StatusBar backgroundColor="#000000" style="light"/>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={BIFROST_LOGO} style={{width: 200, height: 200}}/>
                        <Text style={styles.text}>Bifrost</Text>
                    </View>
                    <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{flex: 4, width: '100%',  alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{width: '70%', alignItems: 'center'}}>
                                <Input
                                    placeholder={'Username'}
                                    setFieldValue={formik.setFieldValue}
                                    value={formik.values.username}
                                    keyword="username"
                                    error={formik.errors.username}
                                    touched={formik.touched.username}
                                />
                                <Input
                                    placeholder={'Password'}
                                    setFieldValue={formik.setFieldValue}
                                    value={formik.values.password}
                                    keyword="password"
                                    secureTextEntry
                                    error={formik.errors.password}
                                    touched={formik.touched.password}
                                />
                            </View>
                            <View style={{width: '70%', alignItems: 'center'}}>
                                <Button onPress={formik.handleSubmit} label={'Log In'} />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </View>
);
};

export default withAPIRequest(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        backgroundColor: '#222222',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    text:{
        color: 'white'
    }
});
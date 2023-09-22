import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WebScreen from "../pages/WebScreen";


const Stack = createNativeStackNavigator();


export const GeneralStack = () => {

/*
             messaging().onNotificationOpenedApp(remoteMessage => {
                 globalContext.setRedirectURI("")
                 globalContext.setRedirectURI(redirectURI);
                 console.log(
                     'Notification caused app to open from background state :',
                     remoteMessage,
                 );
             });

         // Check whether an initial notification is available
             messaging()
                 .getInitialNotification()
                 .then(remoteMessage => {
                     if (remoteMessage) {
                         redirectURI = remoteMessage.data.link
                         globalContext.setRedirectURI(redirectURI);
                         console.log(
                             'Notification caused app to open from quit state:',
                             remoteMessage,
                         ); // e.g. "Settings"
                     }
                 });

             const unsubscribe = messaging().onMessage(msg => {
                 Alert.alert(msg.notification.title, msg.notification.body,[{
                     text: 'Cancel',
                     onPress: () => console.log('Cancel Pressed'),
                     style: 'cancel',
                 },
                     {text: 'View Tickets', onPress: () => {
                             redirectURI = msg.data.link;
                             globalContext.setRedirectURI("");
                             globalContext.setRedirectURI(redirectURI);
                         }},]);
                 console.log(msg);
             });



             const sendFcmToken = async () => {
                 try {
                     if (!messaging().isDeviceRegisteredForRemoteMessages) {
                         await messaging().registerDeviceForRemoteMessages();
                     }
                     const token = await messaging().getToken();
                     console.log("global sensation",globalContext.token)
                     console.log("redirectURI",redirectURI)
                     console.log("fcm ",token)
                     console.log(`${BASE_URL}/v1/notification/register`)
                     const res = await axios.post(`${BASE_URL}/v1/notification/register`, {token},{
                         headers: {
                             Authorization: `Bearer ${globalContext.token}`,
                         }
                     });
                 } catch (err) {
                     console.log(JSON.stringify(err));
                     return;
                 }
             };
             React.useEffect(() => {
                 if(globalContext.token!=="")
                     sendFcmToken()
                 unsubscribe();
             },[globalContext.token])
        */

        return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'Web_View'} component={WebScreen} />
        </Stack.Navigator>
    );
};
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GlobalContext, GlobalContextProvider} from './context/GlobalContext';
import Login from './pages/Login'
import Loader from "./components/Loader";
import {GeneralStack} from "./route-stacks/GeneralStack";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalContextProvider>
        <GlobalContext.Consumer>
            {globalContext => (
                <NavigationContainer>
                    {!globalContext.user ? (
                        <Stack.Navigator screenOptions={{headerShown: false}}>
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{headerShown: false}}
                            />
                        </Stack.Navigator>
                    ) : (
                        <Stack.Navigator screenOptions={{headerShown: false}}>
                            <Stack.Screen name="GeneralStack" component={GeneralStack} />
                        </Stack.Navigator>
                    )}
                    {globalContext.loading && <Loader />}
                </NavigationContainer>
            )}
        </GlobalContext.Consumer>
    </GlobalContextProvider>
  );
}



import React from 'react';
import {useColorScheme, LogBox} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavStack from '../Components/NavStack';

//Fuck this error
// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
//   "RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks",
// ]);

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createStackNavigator();

  // Template code
  // function AuthStack() {
  //   return (
  //     <Stack.Navigator
  //       initialRouteName="Login"
  //       screenOptions={{
  //         headerShown: false,
  //       }}>
  //       <Stack.Screen name="Login" component={LoginScreen} />
  //       {/* <Stack.Screen
  //         name="Promo"
  //         component={PromoCodeScreen}
  //         options={{
  //           headerShown: true,
  //           title: null,
  //           headerTransparent: true,
  //         }}
  //       /> */}
  //       {/* <Stack.Screen
  //         name="Register"
  //         component={RegisterScreen}
  //         options={{
  //           headerShown: true,
  //           title: null,
  //           headerTransparent: true,
  //         }}
  //       /> */}
  //     </Stack.Navigator>
  //   );
  // }

  function MainStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="NavStack" component={NavStack} />
      </Stack.Navigator>
    );
  }

  return (
    // <PushNotificationManager>
    <NavigationContainer>
      {/* {loggedIn !== true ? AuthStack() : HomeStack()} */}
      {MainStack()}
    </NavigationContainer>
    // </PushNotificationManager>
  );
}

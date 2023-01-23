import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavStack from '../Components/NavStack';
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Button,
  Platform,
  useColorScheme,
  LogBox,
} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {UIStore} from '../UIStore';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createStackNavigator();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      console.log('Saving token');

      setExpoPushToken(token);

      try {
        UIStore.update(s => {
          s.expoPushToken = token;
        });
      } catch (error) {
        console.log('Could not save the expo token state.');
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log('Saving notification');

        setNotification(notification);

        console.log('notificationListener', notification);

        try {
          UIStore.update(s => {
            s.notification = notification;
          });
        } catch (error) {
          console.log('Could not save the expo notification state.');
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

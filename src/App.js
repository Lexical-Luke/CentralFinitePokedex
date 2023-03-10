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
import {UIStore} from '../UIStore';

// import * as Notifications from 'expo-notifications';
import {Notifications} from 'react-native-notifications';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import {persistCache} from 'apollo3-cache-persist';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';

LogBox.ignoreLogs([
  '[expo-notifications] EXNotificationCenterDelegate encountered already present delegate of UNUserNotificationCenter:',
]);

export default function App() {
  // const [cameraPermission, setCameraPermission] = useState();
  // const [microphonePermission, setMicrophonePermission] = useState();

  //   useEffect(() => {
  //     Camera.getCameraPermissionStatus().then(setCameraPermission);
  //     Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  //     const cameraPermission = await Camera.getCameraPermissionStatus()
  // const microphonePermission = await Camera.getMicrophonePermissionStatus()
  //   }, []);

  //   console.log(
  //     `Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`,
  //   );
  async function getPermissions() {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
  }
  getPermissions();

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache,
    defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
  });

  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createStackNavigator();

  // Request permissions on iOS, refresh token on Android
  Notifications.registerRemoteNotifications();

  Notifications.events().registerRemoteNotificationsRegistered(
    (event: Registered) => {
      // TODO: Send the token to my server so it could send back push notifications...
      // console.log('Device Token Received', event.deviceToken);
    },
  );
  Notifications.events().registerRemoteNotificationsRegistrationFailed(
    (event: RegistrationError) => {
      console.error(event);
    },
  );

  if (Platform.OS === 'ios') {
    Notifications.ios.checkPermissions().then(currentPermissions => {
      console.log('Badges enabled: ' + !!currentPermissions.badge);
      console.log('Sounds enabled: ' + !!currentPermissions.sound);
      console.log('Alerts enabled: ' + !!currentPermissions.alert);
      // console.log('Car Play enabled: ' + !!currentPermissions.carPlay);
      // console.log(
      //   'Critical Alerts enabled: ' + !!currentPermissions.criticalAlert,
      // );
      // console.log('Provisional enabled: ' + !!currentPermissions.provisional);
      // console.log(
      //   'Provides App Notification Settings enabled: ' + !!currentPermissions.providesAppNotificationSettings,
      // );
      // console.log('Announcement enabled: ' + !!currentPermissions.announcement);
    });
  }

  Notifications.events().registerNotificationReceivedForeground(
    (
      notification: Notification,
      completion: (response: NotificationCompletion) => void,
    ) => {
      console.log('Notification Received - Foreground', notification.payload);

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({alert: true, sound: true, badge: false});
    },
  );

  Notifications.events().registerNotificationOpened(
    (
      notification: Notification,
      completion: () => void,
      action: NotificationActionResponse,
    ) => {
      console.log('Notification opened by device user', notification.payload);
      console.log(
        `Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`,
      );
      completion();
    },
  );

  Notifications.events().registerNotificationReceivedBackground(
    (
      notification: Notification,
      completion: (response: NotificationCompletion) => void,
    ) => {
      console.log('Notification Received - Background', notification.payload);

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({alert: true, sound: true, badge: false});
    },
  );

  Notifications.getInitialNotification()
    .then(notification => {
      console.log(
        'Initial notification was:',
        notification ? notification.payload : 'N/A',
      );
    })
    .catch(err => console.error('getInitialNotifiation() failed', err));

  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: true,
  //     shouldSetBadge: true,
  //   }),
  // });

  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Device.isDevice) {
  //     const {status: existingStatus} =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const {status} = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   return token;
  // }

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => {
  //     console.log('Saving token');

  //     setExpoPushToken(token);

  //     try {
  //       UIStore.update(s => {
  //         s.expoPushToken = token;
  //       });
  //     } catch (error) {
  //       console.log('Could not save the expo token state.');
  //     }
  //   });

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener(notification => {
  //       console.log('Saving notification');

  //       setNotification(notification);

  //       console.log('notificationListener', notification);

  //       try {
  //         UIStore.update(s => {
  //           s.notification = notification;
  //         });
  //       } catch (error) {
  //         console.log('Could not save the expo notification state.');
  //       }
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener(response => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current,
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="NavStack" component={NavStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

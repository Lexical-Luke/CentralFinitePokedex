import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Button,
  input,
  TextInput,
  Alert,
} from 'react-native';
import {UIStore} from '../../UIStore';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const {height, width} = Dimensions.get('window');

import sendPushNotification from '../Notifications/sendPushNotification';

export default function SightingsScreen(props) {
  const [expoPushToken, setExpoPushToken] = useState(() => {
    return UIStore.currentState.expoPushToken;
  });
  const [notification, setNotification] = useState(() => {
    return UIStore.currentState.notification;
  });

  console.log(
    'UIStore.currentState.notification',
    UIStore.currentState.notification,
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{backgroundColor: 'green'}}></View> */}
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>
            Title: {notification && notification.request.content.title}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification('Titlee', 'bodyy', 'dataa');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: width / 5,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

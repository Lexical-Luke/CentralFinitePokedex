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

// import * as Notifications from 'expo-notifications';
import {Notifications} from 'react-native-notifications';

const {height, width} = Dimensions.get('window');

import sendPushNotification from '../Notifications/sendPushNotification';

export default function SightingsScreen(props) {
  // const [expoPushToken, setExpoPushToken] = useState(() => {
  //   return UIStore.currentState.expoPushToken;
  // });
  // const [notification, setNotification] = useState(() => {
  //   return UIStore.currentState.notification;
  // });

  // console.log(
  //   'UIStore.currentState.notification',
  //   UIStore.currentState.notification,
  // );
  async function send() {
    Notifications.postLocalNotification({
      body: 'Local notification!',
      title: 'Local Notification Title',
      sound: 'chime.aiff',
      silent: false,
      category: 'SOME_CATEGORY',
      // userInfo: {},
      // fireDate: new Date(),
    });
    console.log('message sent');
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{backgroundColor: 'green'}}></View> */}
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
        <Button title="Press to Send Notification" onPress={send} />
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

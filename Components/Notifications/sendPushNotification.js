import {useState, useEffect, useRef} from 'react';
import {Text, View, Button, Platform} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {UIStore} from '../../UIStore';

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
export default async function sendPushNotification(title, body, data) {
  console.log('Send notification');

  const expoPushToken = UIStore.currentState.expoPushToken;
  console.log(expoPushToken);

  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: {someData: 'goes here'},
    // title: title,
    // body: body,
    // data: {someData: data},
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).catch(function (error) {
    console.log('sendPushNotification error:', error);
  });
}

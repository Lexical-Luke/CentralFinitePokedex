/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import {UIStore} from '../../UIStore';
import * as Device from 'expo-device';

// import * as Notifications from 'expo-notifications';
import {Notifications} from 'react-native-notifications';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
const LoadingIcon = MaterialIndicator;

import {Icon} from 'react-native-elements';

const {height, width} = Dimensions.get('window');

import sendPushNotification from '../Notifications/sendPushNotification';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';

export default function SightingsScreen(props) {
  const [ToggleRecord, setToggleRecord] = useState(false);
  const [CameraOpen, setCameraOpen] = useState(false);

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
      title: 'Central Finite Pokedex',
      body: 'Upload Complete 🚀',
      sound: 'chime.aiff',
      silent: false,
      category: 'SOME_CATEGORY',
    });
    console.log('message sent');
  }

  const camera = useRef();
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  function startRecordingVideo() {
    camera.current.startRecording({
      flash: 'on',
      onRecordingFinished: video => console.log(video),
      onRecordingError: error => console.error(error),
    });
    console.log('Start Video recording');
  }

  async function stopRecordingVideo() {
    await camera.current.stopRecording();
    console.log('Stop Video Recording');
  }

  // useEffect(() => {
  //   if (ToggleRecord) {
  //     startRecordingVideo();
  //   } else {
  //     stopRecordingVideo();
  //   }
  // }, [ToggleRecord]);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {device == null || !CameraOpen ? (
          <View style={{height: height, width: width}}>
            <View
              style={{
                position: 'absolute',
                top: 0,

                right: 0,
                justifyContent: 'center',
                alignItems: 'center',

                paddingTop: height * 0.075,
                paddingRight: height * 0.035,
              }}>
              <TouchableOpacity
                onPress={() => setCameraOpen(!CameraOpen)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: width * 0.1,
                  width: width * 0.1,

                  borderRadius: 100,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: width * 0.15,
                    width: width * 0.15,

                    borderRadius: 100,
                    backgroundColor: 'rgba(54, 66, 71, 0.9)',
                  }}>
                  <Icon
                    name="camera"
                    type="font-awesome"
                    color="white"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{height: height, width: width}}>
            <Camera
              ref={camera}
              device={device}
              isActive={isFocused && CameraOpen}
              video={true}
              audio={true}
              style={StyleSheet.absoluteFill}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,

                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',

                  paddingTop: height * 0.075,
                  paddingRight: height * 0.035,
                }}>
                <TouchableOpacity
                  onPress={() => setCameraOpen(!CameraOpen)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: width * 0.1,
                    width: width * 0.1,

                    borderRadius: 100,
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: width * 0.15,
                      width: width * 0.15,

                      borderRadius: 100,
                      backgroundColor: 'rgba(54, 66, 71, 0.9)',
                    }}>
                    <Icon name="close" type="font-awesome" color="#f50" />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',

                  padding: height * 0.1,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: width * 0.3,
                    width: width * 0.3,

                    borderRadius: 100,
                    backgroundColor: 'rgba(54, 66, 71, 0.9)',
                  }}>
                  {ToggleRecord ? (
                    <TouchableOpacity
                      onPress={() => setToggleRecord(!ToggleRecord)}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: width * 0.25,
                        width: width * 0.25,

                        borderRadius: 100,
                        backgroundColor: 'rgba(237, 45, 31, 0.9)',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: width * 0.1,
                          width: width * 0.1,
                          borderRadius: 5,

                          backgroundColor: 'rgba(54, 66, 71, 0.9)',
                        }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setToggleRecord(!ToggleRecord)}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: width * 0.25,
                        width: width * 0.25,

                        borderRadius: 100,
                        backgroundColor: 'white',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: width * 0.15,
                          width: width * 0.15,

                          borderRadius: 100,
                          backgroundColor: 'rgba(54, 66, 71, 0.9)',
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Camera>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'rgba(235, 64, 52, 0.9)',
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

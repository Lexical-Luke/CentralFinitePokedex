/* eslint-disable react/self-closing-comp */
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
import {Icon} from 'react-native-elements';

// import * as Notifications from 'expo-notifications';
import {Notifications} from 'react-native-notifications';
import {DocumentDirectoryPath} from 'react-native-fs';

import sendPushNotification from '../Notifications/sendPushNotification';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import Video from 'react-native-video';

import {useUploadForm} from '../Axios/useUploadForm';
import CircularProgress from 'react-native-circular-progress-indicator';

import {MaterialIndicator} from 'react-native-indicators';
const LoadingIcon = MaterialIndicator;

const {height, width} = Dimensions.get('window');
var RNFS = require('react-native-fs');

export default function SightingsScreen(props) {
  const [ToggleRecord, setToggleRecord] = useState(false);
  const [CameraOpen, setCameraOpen] = useState(false);

  const [LatestVideoPath, setLatestVideoPath] = useState('');
  const [formValues, setFormValues] = useState({
    type: 'video/mov',
    file: null,
  });

  const {isSuccess, uploadForm, progress} = useUploadForm(
    'https://mvai.qa.onroadvantage.com/api/analyse?models=Passenger&fps=5&orientation=right',
  );

  const handleSubmit = async () => {
    const formData = new FormData();
    formValues.file && formData.append('file', formValues.file);

    // console.log('formData: ', formData);
    // console.log('formValues: ', formValues);

    return uploadForm(formData);
  };

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

  async function uploadLogic() {
    handleSubmit();
  }

  const camera = useRef();
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  function startRecordingVideo() {
    try {
      console.log('Start Video recording');

      camera.current.startRecording({
        flash: 'on',
        onRecordingFinished: video => {
          setLatestVideoPath(video.path);

          // setFormValues(prevFormValues => ({
          //   ...prevFormValues,
          //   file: video.path,
          // }));

          RNFS.readFile(video.path, 'base64').then(data => {
            // binary data
            // console.log(data);
            setFormValues(prevFormValues => ({
              ...prevFormValues,
              file: data,
            }));
          });

          console.log(video);
        },
        onRecordingError: error => console.error(error),
      });
    } catch (error) {
      console.log('Start Video recording error', error);
    }
  }

  async function stopRecordingVideo() {
    try {
      console.log('Stop Video Recording');
      await camera.current.stopRecording();
    } catch (error) {
      console.log('Stop Video Recording error', error);
    }
  }

  useEffect(() => {
    if (ToggleRecord) {
      startRecordingVideo();
    } else {
      stopRecordingVideo();
    }
  }, [ToggleRecord]);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {device == null || !CameraOpen ? (
          <View style={{height: height, width: width}}>
            <View
              style={{
                zIndex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                top: 0,
                right: 0,

                paddingTop: height * 0.075,
                paddingRight: height * 0.035,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setCameraOpen(!CameraOpen);
                  console.log('LatestVideoPath', LatestVideoPath);
                }}
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
            {LatestVideoPath !== '' && (
              <>
                <TouchableOpacity
                  onPress={() => this.player.presentFullscreenPlayer()}
                  style={{
                    // flex: 1,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // backgroundColor: 'white',
                    paddingTop: height * 0.175,
                  }}>
                  <Video
                    source={{uri: LatestVideoPath}} // Can be a URL or a local file.
                    ref={ref => {
                      this.player = ref;
                    }} // Store reference
                    onBuffer={this.onBuffer} // Callback when remote video is buffering
                    onError={this.videoError} // Callback when video cannot be loaded
                    style={{
                      height: height * 0.5,
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: height * 0.05,
                  }}>
                  <TouchableOpacity
                    onPress={uploadLogic}
                    style={{
                      height: height * 0.1,
                      width: width * 0.5,
                      backgroundColor: 'rgba(73, 235, 107, 0.9)',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {progress > 0 ? (
                      <CircularProgress
                        value={progress}
                        radius={35}
                        activeStrokeWidth={12}
                        progressValueColor={'#ecf0f1'}
                        strokeColorConfig={[
                          {color: 'red', value: 0},
                          {color: 'skyblue', value: 50},
                          {color: 'yellowgreen', value: 100},
                        ]}
                      />
                    ) : (
                      <Text style={{fontWeight: '600', fontSize: width * 0.05}}>
                        Upload Sighting
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
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

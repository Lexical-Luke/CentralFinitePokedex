import {useState} from 'react';
import axios from 'axios';
import {Notifications} from 'react-native-notifications';

export const useUploadForm = url => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  async function sendNotification(title, body) {
    Notifications.postLocalNotification({
      // title: 'Central Finite Pokedex',
      // body: 'Upload Complete 🚀',
      title: title,
      body: body,
      sound: 'chime.aiff',
      silent: false,
      category: 'SOME_CATEGORY',
    });
  }

  const uploadForm = async formData => {
    sendNotification('Central Finite Pokedex', 'Uploading Sighting...');

    await axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          const progress = (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress);
        },
        onDownloadProgress: progressEvent => {
          const progress =
            50 + (progressEvent.loaded / progressEvent.total) * 50;
          // console.log(progress);
          setProgress(progress);
        },
      })
      .then(response => {
        console.log('response', response);

        sendNotification('Central Finite Pokedex', 'Upload Complete 🚀');
        setIsSuccess(true);

        return response;
      })
      .catch(error => {
        console.log('axios error:', error);
        sendNotification('Central Finite Pokedex', error.toString());
      });

    await new Promise(resolve => {
      setTimeout(() => resolve('success'), 500);
    });
    setProgress(0);
  };

  return {uploadForm, isSuccess, progress};
};

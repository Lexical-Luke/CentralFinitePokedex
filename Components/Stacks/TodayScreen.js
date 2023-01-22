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

const {height, width} = Dimensions.get('window');

export default function TodayScreen(props) {
  // const uid = UIStore.useState(s => s.id);

  // Async Function Template
  //   const someFunctionName = async someVar => {
  //     //!Do some or other logic
  //   };

  // Function Template
  //   const someFunctionName = () => {
  //     //!Do some or other logic
  //   };

  // const isDarkMode = useColorScheme() === 'dark';

  // const [show, setShow] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{backgroundColor: 'green'}}></View> */}
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

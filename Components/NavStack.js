import React, {useRef} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Icon} from '@rneui/themed';
import {
  StyleSheet,
  Dimensions,
  Platform,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// Import the screens
import TodayScreen from './Stacks/TodayScreen';
// import TomorrowScreen from './Stacks/TomorrowScreen';

// import theme from './styles/theme.style';

import {BlurView} from 'expo-blur';

const {height, width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

// function StackScreen() {
//   return (
//     <HomeStack.Navigator screenOptions={{headerShown: false}}>
//       <HomeStack.Screen name="Page" component={PageScreen} />
//     </HomeStack.Navigator>
//   );
// }

function TabBar() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="TodayScreen" //TodayScreen || TomorrowScreen
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // tabBarShowLabel: true,
        tabBarActiveTintColor: '#0FB7D5',
        tabBarInactiveTintColor: isDarkMode ? Colors.lighter : Colors.darker,

        //TabBar Container STYLE
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor:
            Platform.OS === 'ios' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.55)',
          // height: Platform.OS === "ios" ? width * 0.2 : width * 0.15, //TabBar height - Slightly larger
          // height: Platform.OS === "ios" ? height * 0.09 : height * 0.07, //TabBar height - Slightly smaller
        },
        //TabBar Background STYLE
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            //iOS - Full Blur
            <BlurView
              tint={isDarkMode ? 'dark' : 'light'}
              intensity={80}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            //Android - Transparency
            <BlurView
              tint={isDarkMode ? 'dark' : 'light'}
              intensity={110}
              style={StyleSheet.absoluteFill}
            />
          ),
      }}>
      <Tab.Screen
        name="TodayScreen"
        component={TodayScreen}
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: ({color, size}) => (
            // <Icon
            //   name="hourglass-end"
            //   type="font-awesome-5"
            //   color={color}
            //   size={size}
            // />
            <View />
          ),
        }}
      />
      {/* <Tab.Screen
        name="TomorrowScreen"
        component={TomorrowScreen}
        options={{
          tabBarLabel: 'Tomorrow',
          tabBarIcon: ({color, size}) => (
            <Icon name="triangle" type="ionicon" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const NavStack = props => {
  const navigationRef = useRef();
  // const routeNameRef = useRef();

  return (
    <NavigationContainer independent={true} ref={navigationRef}>
      <TabBar />
    </NavigationContainer>
  );
};

export default NavStack;

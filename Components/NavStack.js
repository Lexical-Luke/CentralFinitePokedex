import React, {useRef} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import {
  StyleSheet,
  Dimensions,
  Platform,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// Import the screens
import PokedexScreen from './Stacks/PokedexScreen';
import SightingsScreen from './Stacks/SightingsScreen';

import {BlurView} from 'expo-blur';

const {height, width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

function TabBar() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="Pokedex"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // tabBarShowLabel: true,
        tabBarActiveTintColor: 'rgba(237, 117, 52, 0.9)',
        tabBarInactiveTintColor: isDarkMode ? Colors.lighter : Colors.darker,

        //TabBar Container STYLE
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor:
            Platform.OS === 'ios' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.55)',
        },
        //TabBar Background STYLE
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            //iOS - Full Blur
            <BlurView
              tint={isDarkMode ? 'dark' : 'light'}
              intensity={60}
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
        name="PokedexScreen"
        component={PokedexScreen}
        options={{
          tabBarLabel: 'Pokedex',
          tabBarIcon: ({color, size}) => (
            <Icon name="book" type="feather" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SightingsScreen"
        component={SightingsScreen}
        options={{
          tabBarLabel: 'Sightings',
          tabBarIcon: ({color, size}) => (
            <Icon
              name="binoculars"
              type="font-awesome"
              color={color}
              size={size}
            />
          ),
        }}
      />
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

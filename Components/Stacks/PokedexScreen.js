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

import {useLazyLoadQuery, useQueryLoader} from 'react-relay';
// import graphql from 'babel-plugin-relay';
// import graphql from 'babel-plugin-relay/macro';

const {height, width} = Dimensions.get('window');

export default function SightingsScreen(props) {
  // const PokedexQuery = graphql`
  //   query PokedexQuery {
  //     characters {
  //       results {
  //         id
  //         image
  //         name
  //         species
  //       }
  //     }
  //   }
  // `;
  // const data = useLazyLoadQuery(PokedexQuery, {});
  // const Pokedex = data.topStory;
  // const [pokedexQuery, load] = useQueryLoader(PokedexQuery);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
        {/* <Text>Pokedex: {Pokedex}</Text> */}
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

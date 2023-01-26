/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
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
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// import {useLazyLoadQuery, useQueryLoader} from 'react-relay';
// import graphql from 'babel-plugin-relay';
// import graphql from 'babel-plugin-relay/macro';
import {gql, useQuery} from '@apollo/client';
import {FlashList} from '@shopify/flash-list';

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

const PokedexQuery = gql`
  query PokedexQuery {
    characters {
      results {
        id
        image
        name
        species
      }
    }
  }
`;

const {height, width} = Dimensions.get('window');

export default function Pokedexscreen(props) {
  const {data, loading} = useQuery(PokedexQuery);
  // console.log('useQuery', JSON.stringify(data));

  // const data = useLazyLoadQuery(PokedexQuery, {});
  // const Pokedex = data.topStory;
  // const [pokedexQuery, load] = useQueryLoader(PokedexQuery);

  const Species = {
    Human: 'Human',
    Alien: 'Alien',
  };

  const PokedexEntry = ({id, image, name, species}) => (
    <View
      style={{
        height: height * 0.1,
        width: width * 0.9,

        // Debugging
        // borderWidth: 1,
        // borderColor: 'grey',
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'rgba(240, 239, 245, 0.9)',
          borderRadius: 25,
        }}>
        <View
          style={{
            padding: width * 0.015,
          }}>
          <FastImage
            style={{
              width: height * 0.08,
              height: height * 0.08,
              resizeMode: 'cover',
              borderRadius: 100,
            }}
            source={{uri: image, priority: FastImage.priority.high}}
          />
        </View>
        <View
          style={{
            padding: width * 0.02,
          }}>
          <Text
            style={{
              fontSize: width * 0.045,
              fontWeight: '600',
            }}>
            {id.toString().padStart(3, '0')}
          </Text>
          <Text
            style={{
              fontSize: width * 0.045,
            }}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: width * 0.035,
              fontStyle: 'italic',
              color:
                (species === Species.Human && 'red') ||
                (species === Species.Alien && 'green'),
            }}>
            {species}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPokedexEntry = ({item}) => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.01,
      }}>
      <PokedexEntry
        id={item.id}
        image={item.image}
        name={item.name}
        species={item.species}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: width,
        }}>
        {loading ? (
          <LoadingIcon color="white" />
        ) : (
          <FlashList
            data={data?.characters.results}
            estimatedItemSize={30}
            renderItem={renderPokedexEntry}
            ListFooterComponent={() => (
              <View
                style={{
                  paddingBottom: height * 0.08,
                }}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

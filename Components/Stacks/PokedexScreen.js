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
  console.log('useQuery', JSON.stringify(data));
  // const data = useLazyLoadQuery(PokedexQuery, {});
  // const Pokedex = data.topStory;
  // const [pokedexQuery, load] = useQueryLoader(PokedexQuery);

  const PokedexEntry = ({id, image, name, species}) => (
    <View
      style={{
        height: height * 0.1,
        width: width,
        flexDirection: 'row',

        // Debugging
        borderWidth: 1,
        borderColor: 'grey',
      }}>
      <View
        style={{
          padding: width * 0.01,
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
      <View>
        <Text>{name}</Text>
        <Text>{species}</Text>
      </View>
    </View>
  );

  const renderPokedexEntry = ({item}) => (
    <PokedexEntry
      id={item.id}
      image={item.image}
      name={item.name}
      species={item.species}
    />
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            height: height,
            width: width,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <View
              style={{
                flex: 1,
                height: height,
                width: width,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <FlatList
                data={data.characters.results}
                estimatedItemSize={30}
                keyExtractor={index => index.toString()}
                renderItem={renderPokedexEntry}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
      <View
        style={{
          paddingBottom: height * 0.08,

          // Debugging
          // borderWidth: 2,
          // borderColor: "red",
        }}
      />
    </>
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

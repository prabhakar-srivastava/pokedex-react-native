/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, ImageBackground, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPokemonData} from '../../utils/helpers/networkl';

export default function ListingScreen() {
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<number>(0);
  const [pokemonData, setPokemonData] = useState<any>([]);

  // fetching pokemon data from api
  const pokeData = async () => {
    const setPokeData = await getPokemonData();
    if (setPokeData?.length ?? 0 > 0) {
      setPokemonData(setPokeData);
    }
  };

  useEffect(() => {
    pokeData();
  }, []);

  //   useEffect(() => {
  //     console.log('here');

  //     pokemonData?.map((res: any) => console.log(res, 'wewew'));
  //   }, [pokemonData]);
  return (
    <View>
      <ImageBackground source={require('../../utils/assets/bg.png')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 25,
            paddingBottom: 15,
          }}>
          <View
            style={{
              justifyContent: 'left',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 10,
            }}>
            <Image
              source={require('../../utils/assets/tumblr.gif')}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: '#DAA520',
              }}>
              PokeDex
            </Text>
          </View>
          <View>
            <Image
              source={require('../../utils/assets/bookmark.png')}
              style={{width: 30, height: 30}}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            margin: 20,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 10,
          }}>
          <Image
            source={require('../../utils/assets/seachIcon.png')}
            style={{width: 20, height: 20}}
          />
          <TextInput
            placeholder="search by name ..."
            keyboardType="default"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            style={{width: 'auto', height: 50, color: '#000', fontSize: 18}}
          />
        </View>
      </ImageBackground>
      <View
        style={{
          paddingHorizontal: 17,
          backgroundColor: '#fff',
          paddingVertical: 7,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../utils/assets/filterIcon.png')}
          style={{width: 30, height: 30}}
        />
        {[
          {id: 1, text: 'short by: A to Z'},
          {id: 2, text: 'short by: Z to A'},
        ].map((res, index) => {
          return (
            <View
              key={index}
              style={{
                borderWidth: 1,
                borderColor: sortBy === res.id ? '#DAA520' : '#000000',
                borderRadius: 50,
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: sortBy === res.id ? '#DAA520' : 'transparent',
              }}>
              <Text
                onPress={() => {
                  if ((setSortBy as unknown as number) > 0) {
                    setSortBy(0);
                    return;
                  } else {
                    setSortBy(res.id);
                  }
                }}
                style={{
                  fontWeight: 'bold',
                  color: sortBy === res.id ? 'white' : 'black',
                }}>
                {res.text}
              </Text>
            </View>
          );
        })}
      </View>
      <View>
        {pokemonData &&
          pokemonData?.map((res: any, index: number) => {
            return (
              <View key={index}>
                <Text>
                  {res?.name} {res?.url}
                </Text>

                <Image source={{uri: res?.url}} />
              </View>
            );
          })}
        <Text>
          asfdsfs
          {pokemonData?.[0]?.name}
          {pokemonData?.length}
        </Text>
      </View>
    </View>
  );
}

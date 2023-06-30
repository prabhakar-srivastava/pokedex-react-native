/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  View
} from 'react-native';
import { getPokemonData, getPokemonDetails } from '../../utils/helpers/networkl';
import Listing from '../components/listComponents/Listing';

export interface PokeApiResponse {
  name: string;
  url: string;
}
export interface PokeApiType {
  img: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

export default function ListingScreen() {
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<number>(0);
  const [pokemonData, setPokemonData] = useState<PokeApiResponse | any>([]);
  const [pokemonDetails, setPokemonDetails] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false)

  // fetching pokemon data from api
  const pokeData = async () => {
    setLoading(true)
    return new Promise(async (resolve, reject) => {
      const setPokeData = await getPokemonData();
      if (setPokeData?.length > 0) {
        setPokemonData(setPokeData);

        resolve(setPokeData);
      } else {
        reject(new Error('error fetching Pokemon'))
      }
    })
  };


  useEffect(() => {
    pokeData().then((pokemonData) => {
      if ((pokemonData as unknown as any).length > 0) {
        pokeDetails(pokemonData)
      }
    })
  }, []);


  // fetching pokemon details  
  const pokeDetails = (data: any) => {
    let info: any[] = []
    data?.map((item: any) => {
      getPokemonDetails(item?.url)
        .then((details: any) => {
          info.push(details);
        })
        .catch((err) => console.log(err, 'errorListingPokemonDetails'))

    })
    setPokemonDetails(info)
    if (info.length > 0) {
      setLoading(false)
    }
  }

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
              style={{ width: 30, height: 30 }}
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
            overflow: 'hidden'
          }}>
          <Image
            source={require('../../utils/assets/seachIcon.png')}
            style={{ width: 20, height: 20 }}
          />
          <TextInput
            placeholder="search by category, type or name ..."
            keyboardType="default"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            style={{ width: 'auto', height: 50, color: '#000', fontSize: 18 }}
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
          style={{ width: 30, height: 30 }}
        />
        {[
          { id: 1, text: 'short by: A to Z' },
          { id: 2, text: 'short by: Z to A' },
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
        {pokemonData && (<Listing searchText={searchText} data={pokemonData} detailsData={pokemonDetails} />)}
        <Text>
          {pokemonData?.length}
        </Text>
      </View>
    </View>
  );
}

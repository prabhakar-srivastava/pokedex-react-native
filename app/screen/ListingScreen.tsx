/* eslint-disable react-native/no-inline-styles */
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import Listing, { LodingSize, loadingComponent } from '../components/listComponents/Listing';
import typeJson from '../../utils/helpers/types.json'
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchPokemon } from '../../utils/helpers/networkl';

export interface PokeApiResponse {
  nexturl: string;
  list: any[];
}

export interface bgType {
  [key: string]: string;
}

export default function ListingScreen(props: { navigation: { navigate: (arg0: string, arg1?: any) => void; }; }) {
  const [searchText, setSearchText] = useState<string>('');
  const [sortByType, setSortByTYpe] = useState<string>('');
  const [searchError, setSearchError] = useState<boolean>(false)
  const [searchLoader, setSearchLoader] = useState<boolean>(false)
  const [bookmark, setBookmark] = useState<number>(0)
  const isFocus = useIsFocused()
  const { getItem } = useAsyncStorage('bookmark')

  useEffect(() => {
    getbookmarkLength()
  }, [isFocus])




  // fetching bookmark details  
  const getbookmarkLength = async () => {
    try {
      const bookmarkData: any = await getItem()
      const BookmarkLength = JSON.parse(bookmarkData)
      if (BookmarkLength?.length > 0) {

        setBookmark(BookmarkLength?.length)
      } else {
        setBookmark(0)
      }
    } catch (error) {
      console.log(error, 'error fetching bookmarks');

    }
  }
  const disableError = () => {
    setTimeout(() => {
      setSearchError(false)
    }, 2000)
  }

  const searchFilter = async (searchText: string) => {
    setSearchLoader(true)
    try {
      const data = await searchPokemon(searchText)
      console.log(data?.name, 'search');

      if (Object.keys(data).length > 0) {

        props?.navigation?.navigate('DetailScreen', data)
        setSearchLoader(false)
      }
    } catch (error) {
      setSearchError(true)
      disableError()
      setSearchLoader(false)
      console.log('error gettting search ', error);

    }
  }

  return (
    <SafeAreaView>
      <View>
        <View style={{ backgroundColor: '#00003f' }}>
          {searchError && (

            <Text style={{
              backgroundColor: 'white',
              position: 'absolute',
              fontWeight: 'bold',
              fontSize: 20,
              paddingHorizontal: 20,
              color: 'red',
              borderRadius: 5,
              left: 120,
              top: 15
            }}>No result found</Text>

          )}

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
              <TouchableHighlight onPress={() => props?.navigation?.navigate('BookmarkScreen')}>
                <View>
                  <Image
                    source={require('../../utils/assets/bookmark.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  {bookmark > 0 && (
                    <Text style={{
                      backgroundColor: 'white',
                      borderRadius: 10,
                      fontWeight: 'bold',
                      width: 20,
                      textAlign: 'center',
                      position: 'absolute',
                      right: -6,
                      top: -10,
                    }}>{bookmark}</Text>
                  )}

                </View>
              </TouchableHighlight>

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
              overflow: 'hidden',
              justifyContent: 'space-between',
            }}>

            <TextInput
              placeholder="search by name ..."
              keyboardType="default"
              value={searchText}
              onChangeText={text => setSearchText(text)}
              style={{ width: 'auto', height: 50, color: '#000', fontSize: 18 }}
            />
            {searchLoader ? loadingComponent(LodingSize.SMALL)
              : <TouchableHighlight onPress={() => searchFilter(searchText)}>
                <Image
                  source={require('../../utils/assets/seachIcon.png')}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableHighlight>}

          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 17,
            backgroundColor: '#fff',
            paddingVertical: 7,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          {sortByType?.length > 0 &&
            <TouchableHighlight onPress={() => {
              setSortByTYpe('')
            }}>
              <Image
                source={require('../../utils/assets/closeIcon.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableHighlight>
          }

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {typeJson?.types.map((res, index) => {
              return (
                <View
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: sortByType === res ? '#DAA520' : '#000000',
                    borderRadius: 50,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    width: 90,
                    marginHorizontal: 5,
                    backgroundColor: sortByType === res ? '#DAA520' : 'transparent',
                  }}>
                  <Text
                    onPress={() => {
                      if (sortByType === res) {
                        setSortByTYpe('');
                        return;
                      } else {
                        setSortByTYpe(res);
                      }
                    }}
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: sortByType === res ? 'white' : 'black',
                    }}>
                    {res}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View>
          <Listing
            route={props?.navigation}
            filterByType={sortByType}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

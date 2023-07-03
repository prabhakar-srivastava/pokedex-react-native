import { View, Text, FlatList, Image, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import convertToCamelCase from '../../utils/helpers/convertToCamelCase'
import { bgColorbasedOnType } from '../../utils/helpers/bgColorbasedOnType'
import { bgType } from './ListingScreen'
import CustomButton, { TYPE } from '../components/CustomButton'

export default function BookmarkScreen() {
    const [bookmark, setBookmark] = useState<any>([])
    const { getItem, setItem } = useAsyncStorage('bookmark')
    const isFocus = useIsFocused()
    const navigation = useNavigation()


    useEffect(() => {
        getBookmark()
    }, [isFocus])

    const getBookmark = async () => {
        try {
            const bookmark = await getItem()
            const bookmarkData = JSON.parse(bookmark ?? '')

            if (bookmarkData?.length > 0) {
                setBookmark(bookmarkData)
            }

        } catch (error) {
            console.log(error, 'error getting bookmark');

        }
    }
    // deleting bookmark from the storage
    const deleteBookmark = async (id: string) => {
        const temp = bookmark
        try {
            const selectedBookmark = temp?.filter((item: { name: string }) => {
                return item?.name != id
            })
            setBookmark(selectedBookmark)
            await setItem(JSON.stringify(selectedBookmark))

        } catch (error) {
            console.log(error, 'error deleting bookmark');
        }

    }


    const RenderItem = ({ item }: any) => {
        const data = item
        return bookmark && (
            <View key={data?.name} style={{
                marginVertical: 10,
                backgroundColor: (bgColorbasedOnType as bgType)?.[convertToCamelCase(data?.types?.[0]?.type?.name)],
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 15,
            }}>
                <View style={{

                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View>
                        <Image
                            source={require('../../utils/assets/pokeball.png')}
                            style={{
                                width: 90,
                                height: 90,
                                position: 'absolute',
                                opacity: 0.15,
                                zIndex: -1,
                                right: 70,
                                top: -20
                            }}
                        />
                        <Image
                            source={require('../../utils/assets/pokeball.png')}
                            style={{
                                width: 50,
                                height: 50,
                                position: 'absolute',
                                opacity: 0.1,
                                zIndex: -1,
                                left: 5,
                                bottom: -20
                            }}
                        />
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{convertToCamelCase(data?.name)}</Text>
                        <View style={{ marginTop: 5, flexDirection: 'row', gap: 10 }}>
                            {data?.types?.map((types: { type: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined } }, index: number) => {
                                return (
                                    <Text key={index} style={{ borderRadius: 10, backgroundColor: '#D7D7D7', fontSize: 15, fontWeight: 'bold', paddingHorizontal: 10 }}>{types?.type?.name}</Text>
                                )
                            })}
                        </View>
                        <Text style={{ marginTop: 15, fontSize: 15, fontWeight: 'bold' }}>
                            Height :  {`${Math.floor((data.height * 3.937) / 12)}'${((data.height * 3.937) % 12).toFixed(2)}" (${data.height / 10}m)`}
                        </Text>
                        <Text style={{ fontSize: 15, marginTop: 5, fontWeight: 'bold' }}>Weight : {(data.weight / 10).toFixed(2)} kgs (${(data.weight * 0.220462).toFixed(2)} lbs)</Text>
                    </View>
                    <View>
                        <View>
                            <Image
                                source={{ uri: data?.sprites?.other?.home?.front_default }}
                                style={{ width: 130, height: 130 }}
                            />
                            <Image
                                source={require('../../utils/assets/pokeball.png')}
                                style={{
                                    width: 250,
                                    height: 200,
                                    position: 'absolute',
                                    opacity: 0.25,
                                    zIndex: -1
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{
                    left: 110,
                    top: -10,
                }}>
                    <CustomButton title='remove' type={TYPE.SECONDARY} action={() => deleteBookmark(data?.name)} />
                </View>
            </View>

        )
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#D7D7D7' }}>
            {bookmark.length > 0 ? (
                <View style={{ marginTop: 60 }}>
                    <FlatList
                        data={bookmark}
                        showsVerticalScrollIndicator={false}
                        renderItem={(items) => {
                            return <View key={items?.index}>
                                <RenderItem item={items?.item} />
                            </View>
                        }}
                    />
                </View>
            ) : (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 100,
                }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>No Bookmark, Try adding some</Text>
                </View>
            )}


        </View>
    )
}
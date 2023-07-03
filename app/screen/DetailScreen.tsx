import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { bgColorbasedOnType } from '../../utils/helpers/bgColorbasedOnType'
import convertToCamelCase from '../../utils/helpers/convertToCamelCase'
import CustomButton, { TYPE } from '../components/CustomButton'
import { bgType } from './ListingScreen'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { getBreeds } from '../../utils/helpers/networkl'

const Tab = createMaterialTopTabNavigator()

interface DetailScreen {
    route: { params: any }
}

export default function DetailScreen(props: any) {
    const [speciesData, setSpeciesData] = useState<any>()
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
    const data: any = props?.route?.params;
    const backgrounds = data?.types?.[0]?.type?.name;
    const img = data?.sprites?.other?.home?.front_default;

    const { getItem, setItem } = useAsyncStorage('bookmark')

    useEffect(() => {
        isInBookmark()
        fetchBreed()
    }, [data])

    const fetchBreed = async () => {
        try {
            const response: any = await getBreeds(data?.species?.url)
            if (Object.keys(response).length > 0) {
                setSpeciesData(response)

            }
        } catch (error) {
            console.log('error fetching breeds', error);

        }
    }


    const isInBookmark = async () => {
        try {
            const BookmarkData: any = await getItem()
            const bookmark = JSON.parse(BookmarkData)
            bookmark?.map((res: { name: any }) => {
                if (data?.name === res?.name) {
                    setIsBookmarked(true)
                }
            })
        } catch (error) {
            console.log(error, 'error getting bookmark');

        }

    }


    // adding data to storage
    const addToBookmark = async () => {
        let bookmark: any[] = [];
        try {
            const temp: any = await getItem()
            const tempData = JSON.parse(temp)
            tempData?.map((item: any) => bookmark.push(item))
            bookmark.push(data)
            await setItem(JSON.stringify(bookmark))
            isInBookmark()
        } catch (err) {
            console.log(err, 'error saving bookmark');

        }

    }

    const Stats = () => {
        return (
            <View style={{ marginTop: 25 }}>
                <FlatList
                    data={data?.stats}
                    keyExtractor={item => item?.stat.name}
                    renderItem={(items: any) => {

                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, marginHorizontal: 20 }}>
                                <View style={{ flex: 1.2, justifyContent: 'space-between', flexDirection: 'row', marginRight: 10 }}>
                                    <Text style={{ fontSize: 15, opacity: 0.7, fontWeight: 'bold' }}>{items?.item?.stat?.name.toUpperCase()} </Text>
                                    {/* <Text> : </Text> */}
                                </View>
                                <View style={{ flex: 2.1, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <Text
                                        style={{
                                            width: items?.item?.base_stat * 2,
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            height: 7,
                                            backgroundColor: (bgColorbasedOnType as bgType)?.[convertToCamelCase(backgrounds)],
                                            borderRadius: 10,
                                        }}
                                    >
                                    </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{items?.item?.base_stat} </Text>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    const About = () => {
        return (
            <ScrollView>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <View style={{ gap: 20, marginBottom: 10 }}>
                            <Text style={{ fontSize: 20, opacity: 0.7, fontWeight: 'bold' }}>Species</Text>
                            <Text style={{ fontSize: 20, opacity: 0.7, fontWeight: 'bold' }}>Height</Text>
                            <Text style={{ fontSize: 20, opacity: 0.7, fontWeight: 'bold' }}>Weight</Text>
                            <Text style={{ fontSize: 20, opacity: 0.7, fontWeight: 'bold' }}>Abilities</Text>
                        </View>
                        <View style={{ gap: 20, marginBottom: 10, flexWrap: 'wrap', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{convertToCamelCase(data?.species?.name)}</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                {`${Math.floor((data.height * 3.937) / 12)}'${((data.height * 3.937) % 12).toFixed(2)}" (${data.height / 10}m)`}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{(data.weight / 10).toFixed(2)} kgs (${(data.weight * 0.220462).toFixed(2)} lbs)</Text>
                            <Text style={{ flexDirection: 'column', fontSize: 20, fontWeight: 'bold' }}>
                                {data.abilities.map((item: { ability: { name: string } }) => convertToCamelCase(item.ability.name)).join(", ")}
                            </Text>
                        </View>

                    </View>

                    {Object.keys(speciesData ?? [])?.length > 0 && <View>
                        <Text style={{ width: "100%", color: "black", marginVertical: 15, fontSize: 25, fontWeight: "600" }}>Breeding</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                            <Text style={{ flex: 1, fontSize: 15, color: 'rgba(0,0,0,0.6)', fontWeight: "500" }}>Gender</Text>
                            <Text style={{ flex: 2.5, fontSize: 15, color: 'black', fontWeight: "600" }}><Text style={{ color: "#f2c6d6" }}>♀ </Text>{(speciesData.gender_rate / 8 * 100).toFixed(2)}  <Text style={{ color: "#b7badc" }}> ♂ </Text>{(100 - speciesData?.gender_rate / 8 * 100).toFixed(2)}</Text></View>
                        <View style={{ flexDirection: 'row', marginVertical: 8 }}><Text style={{ flex: 1, fontSize: 15, color: 'rgba(0,0,0,0.6)', fontWeight: "500" }}>Egg Groups</Text><Text style={{ flex: 2.5, fontSize: 15, color: 'black', fontWeight: "600" }}>{speciesData?.egg_groups.map((item: { name: string }) => convertToCamelCase(item.name)).join(", ")}</Text></View>
                        <View style={{ flexDirection: 'row', marginVertical: 8 }}><Text style={{ flex: 1, fontSize: 15, color: 'rgba(0,0,0,0.6)', fontWeight: "500" }}>Egg Cycle</Text><Text style={{ flex: 2.5, fontSize: 15, color: 'black', fontWeight: "600" }}>{speciesData?.egg_groups.map((item: { name: string }) => convertToCamelCase(item.name))[0]}</Text></View>
                    </View>}
                </View >
            </ScrollView>
        )
    }

    const Moves = () => {
        return (
            <View style={{ paddingBottom: 10 }}>
                <FlatList
                    data={data?.moves}
                    keyExtractor={item => item.move?.name}
                    renderItem={(items) => {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                marginVertical: 10,
                                marginHorizontal: 20,
                                borderColor: (bgColorbasedOnType as bgType)?.[backgrounds],
                                borderWidth: 1
                            }}>

                                <Text style={{ fontSize: 20 }}>{convertToCamelCase(items?.item?.move?.name)}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: (bgColorbasedOnType as bgType)?.[convertToCamelCase(backgrounds)], }}>
            <View
                style={{
                    flex: 1,
                    height: 300,
                    overflow: 'visible',
                    marginHorizontal: 20
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 40,
                                marginTop: 45,
                                fontWeight: '900',
                                color: 'white',
                            }}>
                            {convertToCamelCase(data?.name)}
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}>
                            {data?.types?.map((type: { type: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined } }, index: number) => {
                                return (
                                    <View key={index} style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={[detailStyle.type, { paddingHorizontal: 10 }]}>{type?.type?.name}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ right: isBookmarked ? 50 : 30, zIndex: 1000000 }}>
                        <CustomButton buttonWidth={isBookmarked ? 80 : 60} width={30} title={`${isBookmarked ? 'Added' : 'Add'}`} type={TYPE.SECONDARY} action={() => { !isBookmarked && addToBookmark() }} />
                    </View>

                </View>


                <View style={detailStyle.position_center}>
                    <Image
                        source={{ uri: `${img}` }}
                        style={{
                            width: 350,
                            height: 350,
                            top: -75,
                            zIndex: 1000
                        }}
                    />
                    <Image source={require('../../utils/assets/pokeball.png')}
                        style={{
                            width: 100,
                            height: 100,
                            marginTop: 10,
                            marginBottom: 10,
                            opacity: 0.2,
                            right: -50,
                            top: 50,
                            zIndex: -1,
                            position: 'absolute',
                            // right: 1,

                        }}
                    />
                    <Image source={require('../../utils/assets/pokeball.png')}
                        style={{
                            width: 130,
                            height: 130,
                            marginTop: 10,
                            marginBottom: 10,
                            left: -10,
                            opacity: 0.2,
                            zIndex: -1,
                            top: -40,
                            position: 'absolute',
                            // right: 1,

                        }}
                    />
                    <Image source={require('../../utils/assets/pokeball.png')}
                        style={{
                            width: 300,
                            height: 300,
                            marginTop: 10,
                            marginBottom: -30,
                            opacity: 0.2,
                            zIndex: -1,
                            position: 'absolute',
                            // right: 1,

                        }}
                    />
                </View>


            </View>
            <View style={{ flex: 1.2, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: 'white' }}>
                <Text>
                    {/* blank space */}
                </Text>
                <Tab.Navigator>
                    <Tab.Screen
                        name="About"
                        component={About}
                        options={{
                            tabBarLabel: 'Details',
                        }}
                    />
                    <Tab.Screen
                        name="Stats"
                        component={Stats}
                        options={{
                            tabBarLabel: 'Stats',

                        }}
                    />

                    <Tab.Screen
                        name="moves"
                        component={Moves}
                        options={{
                            tabBarLabel: 'moves',
                        }}
                    />
                </Tab.Navigator>
                <View style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 130


                }}>
                </View>
            </View>
        </View>
    )
}
const detailStyle = StyleSheet.create({
    position_center: {
        justifyContent: 'center',
        alignItems: 'center'

    },

    barStyle: {
        backgroundColor: 'black',
    },

    type: {
        backgroundColor: '#D7D7D7',
        textAlign: 'center',
        borderRadius: 10,
        padding: 2,
        fontWeight: 'bold',
    }
})

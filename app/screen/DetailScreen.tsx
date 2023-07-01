import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { bgColorbasedOnType } from '../../utils/helpers/bgColorbasedOnType'
import convertToCamelCase from '../../utils/helpers/convertToCamelCase'
import CustomButton, { TYPE } from '../components/CustomButton'
import { bgType } from './ListingScreen'
// import {Async}
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'

const Tab = createMaterialTopTabNavigator()

interface DetailScreen {
    route: { params: any }
    navigation: { goBack: () => void }
}

// let bookmark: any[] = []
export default function DetailScreen(props: any) {
    const { goBack } = props?.navigation
    const [speciesData, setSpeciesData] = useState<any>()
    const data: any = props?.route?.params;
    const backgrounds = data?.types?.[0]?.type?.name;
    const img = data?.sprites?.other?.home?.front_default;

    const { getItem, setItem } = useAsyncStorage('bookmark')
    const clearAll = () => {
        AsyncStorage.clear()
    }


    useEffect(() => {


        if (props?.route.params != undefined) {
            fetch(data?.species?.url)
                .then((response) => {
                    response.json()
                })
                .then((result) => {
                    console.log(result, 'efsdsdf');

                    setSpeciesData(result)
                })
                .catch((e) => console.log(e))
        }
    }, [props?.route])

    // adding data to storage
    const addToBookmark = async () => {
        let bookmark: any[] = [];
        try {
            const temp: any = await getItem()
            const tempData = JSON.parse(temp)
            tempData?.map((item: any) => bookmark.push(item))
            bookmark.push(data)
            await setItem(JSON.stringify(bookmark))
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
            <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
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

                <Text style={{ width: "100%", color: "black", marginVertical: 15, fontSize: 25, fontWeight: "600" }}>Breeding</Text>
                {/* <View style={{ flexDirection: 'row', marginVertical: 8 }}><Text style={{ flex: 1, fontSize: 15, color: 'rgba(0,0,0,0.6)', fontWeight: "500" }}>Gender</Text><Text style={{ flex: 2.5, fontSize: 15, color: 'black', fontWeight: "600" }}><Text style={{ color: "#f2c6d6" }}>♀ </Text>{(speciesData.gender_rate / 8 * 100).toFixed(2)}<Text style={{ color: "#b7badc" }}> ♂ </Text>{(100 - speciesData.gender_rate / 8 * 100).toFixed(2)}</Text></View> */}
                {/* <View style={{ flexDirection: 'row', marginVertical: 8 }}><Text style={{ flex: 1, fontSize: 15, color: 'rgba(0,0,0,0.6)', fontWeight: "500" }}>Egg Groups</Text><Text style={{ flex: 2.5, fontSize: 15, color: 'black', fontWeight: "600" }}>{speciesData.egg_groups.map((item: { name: string }) => convertToCamelCase(item.name)).join(", ")}</Text></View>
                <View style={{ flexDirection: 'row', marginVertical: 8 }}><Text style={{ flex: 1, fontSize: 15, color: 'rgba(0,0,0,0.6)', fontWeight: "500" }}>Egg Cycle</Text><Text style={{ flex: 2.5, fontSize: 15, color: 'black', fontWeight: "600" }}>{speciesData.egg_groups.map((item: { name: string }) => convertToCamelCase(item.name))[0]}</Text></View> */}
            </View >
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
                                alignItems: 'center',
                                marginVertical: 10,
                                marginHorizontal: 20,
                                borderColor: (bgColorbasedOnType as bgType)?.[backgrounds],
                                borderWidth: 1
                            }}>

                                <Text style={{ fontSize: 25 }}>{items?.item?.move?.name}</Text>
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
                    overflow: 'visible'
                }}>
                <TouchableHighlight style={{ zIndex: 1000000 }} onPress={() => goBack()}>
                    <Image
                        source={require('../../utils/assets/backIcon.png')}
                        style={{ width: 40, height: 30, position: 'absolute', top: 20, left: 15 }} />
                </TouchableHighlight>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 30,
                        marginTop: 15,
                        fontWeight: '900',
                        color: 'white'
                    }}>
                    {data?.name}
                </Text>
                <View style={detailStyle.position_center}>
                    <Image
                        source={{ uri: `${img}` }}
                        style={{
                            width: 300,
                            height: 300,
                            top: -25,
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
            <View style={{ flex: 1.7, borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: 'white' }}>
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
                    <CustomButton title='Bookmark' type={TYPE.SECONDARY} action={() => addToBookmark()} />
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
    }
})

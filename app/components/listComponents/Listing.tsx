import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import convertToCamelCase from '../../../utils/helpers/convertToCamelCase';
import { bgColorbasedOnType } from '../../../utils/helpers/bgColorbasedOnType';

interface Listing {
    searchText: string;
    data: {
        name: string,
        url: string
    }[];
    detailsData: any
}
type ListingData = {
    name: string,
    img: string,
    type: any[]
}[]

const convertToObject = (data: any[], detailsData: any[]) => {
    let listingData: ListingData = []
    data.map((res: any) => {
        detailsData.map((details: any) => {
            if (res.name === details.name) {
                listingData.push({
                    name: details.name,
                    img: details?.sprites?.other?.home?.front_default,
                    type: details?.types
                })
            }
        })
    })
    return listingData
}
export default function Listing({ searchText, data, detailsData }: Listing) {
    const [lisingData, setListingData] = useState<ListingData>([])
    const [search, setSearch] = useState<string>('')


    useEffect(() => {
        console.log(data.length, detailsData.length, 'length');

        const objextData = convertToObject(data, detailsData)
        if (objextData?.length > 0) {
            setListingData(objextData)
        }
    }, [data, detailsData])

    // setting searchedData
    useEffect(() => {
        setSearch(searchText)
    }, [searchText])

    useEffect(() => {
        console.log(lisingData?.[0]?.type?.[0]?.type?.name);

    }, [lisingData])

    return (
        <ScrollView>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: 17,
                marginVertical: 20,
                gap: 15,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {lisingData.filter((res) => {
                    if (res?.name.toLowerCase().includes(search.toLowerCase()) ||
                        res?.type?.[0]?.type?.name.toLowerCase().includes(search.toLowerCase())) {
                        return res
                    }
                    if (!search) {
                        return res
                    }
                }).map((lisingData, index: number) => {
                    const background = convertToCamelCase(lisingData?.type?.[0]?.type?.name)
                    return (
                        <View key={index} style={[{ backgroundColor: bgColorbasedOnType?.[background] }, ListStyle.container]}>
                            <View>
                                <Text style={{ color: 'white', fontSize: 20 }}>{convertToCamelCase(lisingData.name)}</Text>
                                <View style={{ gap: 10, marginTop: 5 }}>{lisingData?.type.map((res: any, index: number) => {
                                    return <Text style={ListStyle.type} key={index}>{res?.type?.name}</Text>
                                })}</View>
                            </View>
                            <View>
                                <Image source={{ uri: `${lisingData.img}` }} style={{ width: 90, height: 80 }} />
                                <Image source={require('../../../utils/assets/pokeball.png')}
                                    style={{
                                        width: 90,
                                        height: 80,
                                        position: 'absolute',
                                        zIndex: -1,
                                        opacity: 0.4,
                                        bottom: -20,
                                        right: -20
                                    }}
                                />

                            </View>
                        </View>
                    )
                })
                }
            </View>
        </ScrollView>
    )
}
const ListStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        padding: 20,
        borderRadius: 10,
        height: 130,
        width: 180,
        justifyContent: 'space-around',
        overflow: 'hidden',


    },

    type: {
        backgroundColor: '#D7D7D7',
        textAlign: 'center',
        borderRadius: 10,
        padding: 2,
        fontWeight: 'bold',
    }
})
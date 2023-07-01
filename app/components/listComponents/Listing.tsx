import { View, Text, ScrollView, Image, StyleSheet, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import convertToCamelCase from '../../../utils/helpers/convertToCamelCase';
import { bgColorbasedOnType } from '../../../utils/helpers/bgColorbasedOnType';
import ListItem from './ListItem';

interface Listing {
    searchText: string;
    data: {
        name: string,
        url: string
    }[];
    detailsData: any
    route: any
}
type ListingData = {
    name: string,
    img: string,
    type: any[],
    detail: any
}[]

const convertToObject = (data: any[], detailsData: any[]) => {
    let listingData: ListingData = []
    data.map((res: any) => {
        detailsData.map((details: any) => {
            if (res.name === details.name) {
                listingData.push({
                    name: details.name,
                    img: details?.sprites?.other?.home?.front_default,
                    type: details?.types,
                    detail: details
                })
            }
        })
    })
    return listingData
}
export default function Listing({ searchText, data, detailsData, route }: Listing) {
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
        // console.lsddsfgdhdsfhsdfsetgwgdfgfa?.[vfdsvsd]);

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
                        <View key={index}>
                            <ListItem route={route} data={lisingData} bg={background} />
                        </View>
                    )
                })
                }
            </View>
        </ScrollView>
    )
}
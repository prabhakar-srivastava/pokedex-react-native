import { View, Text, ScrollView, Image, StyleSheet, TouchableHighlight, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import convertToCamelCase from '../../../utils/helpers/convertToCamelCase';
import { bgColorbasedOnType } from '../../../utils/helpers/bgColorbasedOnType';
import ListItem from './ListItem';
import { convertToObject } from '../../../utils/helpers/convertToObject';
import { PokeApiResponse } from '../../screen/ListingScreen';
import { getAllData, searchPokemon } from '../../../utils/helpers/networkl';
import { useNavigation } from '@react-navigation/native';

interface Listing {
    route: any,
    filterByType: string
}
export type ListingData = {
    name: string,
    img: string,
    type: any[],
    detail: any

}[]


let count = 0
export default function Listing({ route, filterByType }: Listing) {
    const [lisingData, setListingData] = useState<ListingData>([])
    const [filterData, setFilterData] = useState<ListingData>([])
    const [nextUrl, setNextUrl] = useState<string>('')
    const [filterType, setFilterType] = useState<string>(filterByType)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAllData()
    }, [])

    // setting searchedData


    useEffect(() => {
        if (filterType !== filterByType) {
            setFilterData([])

        }
        fetchAllData()
    }, [filterByType])



    const fetchAllData = async (nextUrl?: string) => {
        let filterResponse: any[] = []
        setLoading(true)
        try {
            const data = await getAllData(nextUrl)
            if (data?.list?.length > 0) {
                if (filterByType != "") {

                    data?.list?.map((res: { detail: { types: { type: { name: string; }; }[]; }; }) => {
                        if (filterByType.toLowerCase() === res?.detail?.types?.[0]?.type.name.toLowerCase()) {
                            filterResponse.push(res)

                        }
                    })
                }
                setFilterData([...filterData, ...filterResponse])
                setListingData([...lisingData, ...data.list])
                setNextUrl(data.nextUrl)
                setLoading(false)
                count++
            }

        } catch (error) {
            console.log('error fetching all data', error);

        }

    }


    const reachEndPoint = () => {
        if (!loading && nextUrl) {
            fetchAllData(nextUrl)
        }
    }

    const loadingComponent = () => {
        return <View style={{ marginVertical: 30 }}>
            <ActivityIndicator color="black" size="large" />
        </View>
    }

    return (
        <View style={{ height: '100%' }}>
            <View style={{
                marginBottom: 40
            }}>
                {loading && count === 0 ? loadingComponent() : (
                    <FlatList
                        data={filterByType.length > 0 ? filterData : lisingData}
                        numColumns={Math.floor(Dimensions.get('window').width / 180)}
                        contentContainerStyle={{ alignItems: 'center', gap: 14 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const background = convertToCamelCase(item?.type?.[0]?.type?.name)
                            return <View style={{ paddingHorizontal: 8 }}>
                                <ListItem route={route} data={item} bg={background} />
                            </View>
                        }}
                        onEndReached={reachEndPoint}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={loading ? loadingComponent() : null}
                    />
                )}
            </View>
        </View>
    )
}

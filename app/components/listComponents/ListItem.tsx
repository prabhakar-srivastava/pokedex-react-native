import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { bgColorbasedOnType } from '../../../utils/helpers/bgColorbasedOnType';
import convertToCamelCase from '../../../utils/helpers/convertToCamelCase';
import { bgType } from '../../screen/ListingScreen';

export default function ListItem(props: { data: any; bg: any; route: { navigate: (arg0: string, arg1: any) => void } }) {
    const listingData = props?.data
    const background = props?.bg
    return (
        <TouchableHighlight
            onPress={() => props?.route?.navigate('DetailScreen', listingData?.detail)}
            style={{ borderRadius: 10 }}
        >
            <View style={[{ backgroundColor: (bgColorbasedOnType as bgType)?.[background] }, ListStyle.container]}>
                <View>
                    <Text style={{ color: 'white', fontSize: 20 }}>{convertToCamelCase(listingData.name)}</Text>
                    <View style={{ gap: 10, marginTop: 5 }}>{listingData?.type.map((res: any, index: number) => {
                        return <Text style={ListStyle.type} key={index}>{res?.type?.name}</Text>
                    })}</View>
                </View>
                <View >
                    <Image source={{ uri: `${listingData.img}` }} style={{ width: 90, height: 80 }} />
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

        </TouchableHighlight>
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
        color: 'black'
    }
})
import { ListingData } from "../../app/components/listComponents/Listing"

export const convertToObject = (pokeObject: any, data: any[], detailsData: any[]) => {
    let listingData: ListingData = []
    let PokemonObject = {}
    try {
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
    } catch (error) {
        console.log('error converting to object', error);

    }
    PokemonObject = {
        ...PokemonObject,
        nextUrl: pokeObject?.next,
        list: listingData

    }
    return PokemonObject
}
import { convertToObject } from "./convertToObject";

const getPokemonData = async (nextUrl?: string) => {
  const url = nextUrl ?? 'https://pokeapi.co/api/v2/pokemon'
  try {
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data, 'Pokemon');
    return data

  } catch (error) {
    console.log('Error fetch');
  }

};

const getPokemonDetails = async (url: string) => {
  const uri = url
  try {
    const response = await fetch(uri)
    const data = await response.json()
    return data

  } catch (error) {
    console.log('Error fetch');

  }

};

export const getAllData = async (nextUrl?: string) => {
  try {
    const data = await getPokemonData(nextUrl)
    const details = await Promise.all(data.results.map(async (res: { url: string; }) => {
      const data = await getPokemonDetails(res?.url)
      return data
    }))
    const PokemonObject: any = convertToObject(data, data?.results, details)
    // console.log(PokemonObject?.list?.length, PokemonObject.nextUrl, 'pkdata');
    return PokemonObject;

  } catch (error) {
    console.log('error getting all data', error);

  }

}
export const searchPokemon = async (value: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('error getting search data', error);

  }

}

export const getBreeds = async (url: string) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data

  } catch (error) {
    console.log('error getting breed data', error);

  }

}
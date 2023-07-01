export const getPokemonData = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  if (response.status === 200) {
    const data = await response.json();
    return data?.results;
  } else {
    throw new Error('Error fetch');
  }
};

export const getPokemonDetails = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 200) {
    const data = await res.json();
    return data
  } else {
    throw new Error('Error fetch');
  }

};

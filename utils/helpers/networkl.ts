let data: object[] = [];
export const getPokemonData = async () => {
  await fetch('https://pokeapi.co/api/v2/pokemon')
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Not Found');
      }
    })
    .then(response => {
      data = response?.results;
    })
    .catch(err => console.log(err, 'errror'));
  return data;
};

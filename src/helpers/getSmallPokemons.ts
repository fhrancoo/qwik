import { type PokemonListResponse } from "~/interfaces/pokemon-list.response";
import { type SmallPokemon } from "~/interfaces/small-pokemon";

export const getSmallPokemons = async (offset: number = 0, limit: number = 10): Promise<SmallPokemon[]> => {

  if ( offset < 0 ) offset = 0;
  if ( limit < 0 ) limit = 10;


  let response: SmallPokemon[] = [];
  try {
    console.log(`🔹 fetch to: https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json() as PokemonListResponse;
    response = data.results.map(({ url, name }) => {
      return {
        id: url.split('/').at(-1)!,
        name
      }
    })
  } catch (error) {
    console.log('error: ', error);
  }
  
  return response;
}



import { useState } from "react";
import PokemonData from "./PokemonData";

interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface HomeProps {
  data: PokemonData[];
}

export default function Home({ data }: HomeProps) {
  const [pokemon, setPokemon] = useState(data || []);

  return (
    <div>
      <PokemonData pokemon={pokemon} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
  );
  const pokemonData = await res.json();
  const data = await Promise.all(
    pokemonData.results.map(async (poke: any) => {
      const response = await fetch(poke.url);
      const pokeData = await response.json();
          return {
            id: pokeData?.id,
          name: pokeData?.name,
          sprites: pokeData?.sprites?.front_default
          }
        })
);
  return { props: { data } };
}
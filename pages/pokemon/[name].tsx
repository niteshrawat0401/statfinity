import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const PokemonDetail = (pokemonData: any) => {
  const [pokemonDetail, setPokemonDetail] = useState(pokemonData || []);

  const getStatColor = (statName: string) => {
    const colors: { [key: string]: string } = {
      hp: "bg-red-500",
      attack: "bg-orange-500",
      defense: "bg-yellow-500",
      "special-attack": "bg-blue-500",
      "special-defense": "bg-green-500",
      speed: "bg-pink-500",
    }
    return colors[statName] || "bg-gray-500"
  }

  const getTypeColor = (typeName: string) => {
    const colors: { [key: string]: string } = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-300",
      fighting: "bg-red-600",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-green-400",
      rock: "bg-yellow-700",
      ghost: "bg-purple-600",
      dragon: "bg-indigo-600",
      dark: "bg-gray-700",
      steel: "bg-gray-400",
      fairy: "bg-pink-300",
    }
    return colors[typeName] || "bg-gray-500"
  }

  return (
<div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
          <ArrowLeft className="mr-2" size={20} />
          Back to all Pokémon
        </Link>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <div className="w-64 h-64 relative mb-6 md:mb-0 md:mr-8">
              <Image
                src={pokemonDetail?.pokemonData?.sprites?.front_default || "/placeholder.svg"}
                alt={pokemonDetail?.pokemonData?.name}
                // layout="fill"
                // objectFit="contain"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 text-center md:text-left">
                {pokemonDetail?.pokemonData?.name?.charAt(0).toUpperCase() + pokemonDetail?.pokemonData?.name?.slice(1)}
              </h1>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-purple-400">Types</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemonDetail?.pokemonData?.types?.map((type: any) => (
                    <span
                      key={type.type.name}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(type?.type?.name)}`}
                    >
                      {type?.type?.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-purple-400">Abilities</h2>
                <ul className="list-disc list-inside">
                  {pokemonDetail?.pokemonData?.abilities?.map((ability: any) => (
                    <li key={ability?.ability?.name} className="mb-1">
                      {ability?.ability?.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Stats</h2>
            <div className="space-y-4">
              {pokemonDetail?.pokemonData?.stats?.map((stat : any) => (
                <div key={stat?.stat?.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      {stat?.stat?.name.charAt(0).toUpperCase() + stat?.stat?.name?.slice(1).replace("-", " ")}
                    </span>
                    <span className="text-sm font-medium">{stat?.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getStatColor(stat?.stat?.name)}`}
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Moves</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {pokemonDetail?.pokemonData?.moves?.slice(0, 8).map((move : any) => (
                <div key={move?.move?.name} className="bg-gray-700 rounded px-3 py-2 text-sm">
                  {move?.move?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail

export async function getServerSideProps(context: any) {
  const { name } = context.query;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();
     const  pokemonData = {
      name: pokemon?.name,
      sprites: pokemon?.sprites,
      types: pokemon?.types,
      abilities: pokemon?.abilities,
      stats: pokemon?.stats,
      moves: pokemon?.moves,
    }
  
  return {
    props: { pokemonData }
  }
}
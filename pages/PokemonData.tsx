import Image from "next/image";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const PokemonData = ({ pokemon }: any) => {
  const [search, setSearch] = useState("");

  const filteredPokemon = useMemo(() => 
    pokemon?.filter((poke: any) => 
      poke.name.toLowerCase().includes(search.toLowerCase())
    ), [search, pokemon]);
  

  return (
    <div>
      <div
        className={`min-h-screen bg-gray-900 text-white p-4 ${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-400 mb-8">
            Pokémon Explorer
          </h1>

          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-full border-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search
                className="absolute right-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPokemon?.map((poke: any) => (
              <Link
                key={poke.id}
                href={`/pokemon/${poke?.name}`}
                className="transform transition duration-500 hover:scale-110"
              >
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-700">
                  <div className="relative w-full pt-[20%] bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src={poke.sprites || "/placeholder.svg"}
                      alt={poke.name}
                      className="rounded-t-lg"
                      width={200}
                      height={200}
                    />
                  </div>
                  <h2 className="text-lg font-bold text-center mt-2 text-purple-300">
                    {poke?.name.charAt(0).toUpperCase() + poke?.name.slice(1)}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonData;

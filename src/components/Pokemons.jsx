//import { useEffect, useState } from "react";
import useFetchPokemons from "../hooks/useFetchPokemons";
import { IoSearch } from "react-icons/io5";
import PokemonList from "./PokemonList";
import { useState } from "react";

function Pokemons() {
  const { pokemons, loading, error } = useFetchPokemons();
  const [pokemonName, setPokemonName] = useState("");
  const [limit, setLimit] = useState(50);
  /*
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20",
        );
        const data = await response.json();
        setPokemons(data.results);
      } catch (error) {
        console.error("Error fetching Pokemons:", error);
      }
    };
    fetchPokemons();
  }, []);
  */

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName.toLowerCase()),
  );

  /* controlled search
  function handleSubmit(e) {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  }
  */

  return (
    <section className="p-4 py-5">
      <form>
        <div className="bg-white p-3.5 flex rounded-2xl text-lg">
          <input
            className="outline-none flex-1 font-medium text-gray-700"
            type="text"
            placeholder="Search Pokemons..."
            name="pokemonName"
            onChange={(e) => setPokemonName(e.target.value.toLowerCase())}
          />
          <button
            className="bg-red-500 text-white p-2 rounded-xl text-2xl shadow-md shadow-red-400 hover:bg-red-400 transition-colors"
            type="submit"
          >
            <IoSearch />
          </button>
        </div>
      </form>
      <PokemonList pokemons={pokemonsByName.slice(0, limit)} />
    </section>
  );
}
export default Pokemons;

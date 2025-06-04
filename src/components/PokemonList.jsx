import PokemonCard from "./PokemonCard";
import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

function PokemonList({ pokemons }) {
  const { openPokemonDetail } = useContext(PokemonContext);

  return (
    <section className="pt-14 grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-4 gap-y-14">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.url}
          pokemonURL={pokemon.url}
          onClick={openPokemonDetail}
        />
      ))}
    </section>
  );
}

export default PokemonList;

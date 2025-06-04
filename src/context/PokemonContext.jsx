import { createContext, useState } from "react";
import {
  formatStats,
  formatTypes,
  formatAbilities,
  getPokemonDescription,
  getEvolutions,
} from "../utils/pokemon";
import axios from "axios";

const PokemonContext = createContext();

// defines which component will use this context
function PokemonProvider({ children }) {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [showPokemonDetail, setShowPokemonDetail] = useState(false);

  async function openPokemonDetail(pokemonInfo) {
    const { data: pokemonSpecie } = await axios.get(pokemonInfo.species.url);
    const { data: pokemonEvolution } = await axios.get(
      pokemonSpecie.evolution_chain.url,
    );

    const { id, name, height, weight, stats } = pokemonInfo;

    setPokemonDetail({
      id,
      name,
      height,
      weight,
      stats: formatStats(stats),
      type: formatTypes(pokemonInfo.types),
      abilities: formatAbilities(pokemonInfo.abilities),
      description: getPokemonDescription(pokemonSpecie),
      evolutions: getEvolutions(pokemonEvolution),
    });

    setShowPokemonDetail(true);
  }

  function closePokemonDetail() {
    setShowPokemonDetail(false);
  }

  return (
    <PokemonContext.Provider
      value={{
        showPokemonDetail,
        openPokemonDetail,
        closePokemonDetail,
        pokemonDetail,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export { PokemonContext, PokemonProvider };

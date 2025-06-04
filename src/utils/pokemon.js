const colorByType = {
  normal: "bg-[#BCBCAC]",
  fighting: "bg-[#BC5442]",
  flying: "bg-[#669AFF]",
  poison: "bg-[#AB549A] text-white",
  ground: "bg-[#DEBC54]",
  rock: "bg-[#BCAC66]",
  bug: "bg-[#ABBC1C]",
  ghost: "bg-[#6666BC]",
  steel: "bg-[#ABACBC]",
  fire: "bg-[#FF421C] text-white",
  water: "bg-[#2F9AFF]",
  grass: "bg-[#78CD54]",
  electric: "bg-[#FFCD30]",
  psychic: "bg-[#FF549A]",
  ice: "bg-[#78DEFF]",
  dragon: "bg-[#7866EF]",
  dark: "bg-[#785442]",
  fairy: "bg-[#FFACFF]",
  unknown: "",
  shadow: "",
};

const formatStats = (stats) => {
  const namedStats = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

  const newStats = stats.map(({ stat, base_stat }) => ({
    name: namedStats[stat.name],
    base_stat: base_stat,
  }));

  newStats.push({
    name: "TOT",
    base_stat: newStats.reduce((acc, stat) => stat.base_stat + acc, 0),
  });

  return newStats;
};

function formatTypes(types) {
  return types.map((type) => type.type.name);
}

function formatAbilities(abilities) {
  return abilities.map((ability) => ability.ability.name);
}

function getPokemonDescription(pokemonSpecie) {
  return pokemonSpecie.flavor_text_entries[1].flavor_text;
}

function getEvolutions(pokemonEvolution) {
  const evolutions = [];
  let evolutionData = pokemonEvolution.chain;

  do {
    const evoDetails = evolutionData.evolution_details[0];

    evolutions.push({
      name: evolutionData.species.name,
      minLevel: evoDetails?.min_level || null,
    });

    evolutionData = evolutionData.evolves_to[0];
  } while (evolutionData);

  return evolutions;
}

export {
  colorByType,
  formatStats,
  formatTypes,
  formatAbilities,
  getPokemonDescription,
  getEvolutions,
};

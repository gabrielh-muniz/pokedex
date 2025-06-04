import { useEffect, useState } from "react";
import axios from "axios";
import { colorByType } from "../utils/pokemon";
import { ClipLoader } from "react-spinners";

function PokemonCard({ pokemonURL, onClick }) {
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(pokemonURL)
      .then(({ data }) => setPokemonInfo(data))
      .catch((error) => console.error("Error fetching Pokemon:", error))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="flex justify-center items-center">
      <ClipLoader />
    </div>
  ) : (
    <article
      onClick={() => onClick(pokemonInfo)}
      className="bg-white text-center rounded-3xl relative font-semibold capitalize pb-2 shadow-md shadow-slate-400/10 border-2 border-transparent hover:border-slate-200 cursor-pointer group grid gap-2"
    >
      <header className="h-9">
        <img
          className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 group-hover:scale-130 transition-transform duration-300 pixelated"
          src={
            pokemonInfo.sprites.versions["generation-v"]["black-white"]
              .front_default
          }
          alt=""
        />
      </header>
      <span className="text-slate-400">{`No. ${pokemonInfo.id}`}</span>
      <h4 className="text-xl">{pokemonInfo.name}</h4>
      <ul className="flex gap-2 justify-center">
        {pokemonInfo.types.map((type, index) => (
          <li
            className={`rounded-md p-1 px-2 font-medium text-sm ${colorByType[type.type.name]}`}
            key={index}
          >
            {type.type.name}
          </li>
        ))}
      </ul>
    </article>
  );
}
export default PokemonCard;

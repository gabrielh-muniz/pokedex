import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchAllPokemons() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1302")
      .then((res) => {
        setAllPokemons(res.data.results);
      })
      .catch((err) => {
        console.error("Error fetching all Pokemons:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { allPokemons, loading };
}

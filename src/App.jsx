import Pokemons from "./components/Pokemons";
import ModalPokemonInfo from "./components/ModalPokemonInfo";
import Aside from "./components/Aside";
import { useContext } from "react";
import { PokemonContext } from "./context/PokemonContext";

function App() {
  const { showPokemonDetail, closePokemonDetail } = useContext(PokemonContext);

  return (
    <section className="bg-[#F6F8FC] h-screen overflow-y-auto">
      <main className="max-w-[1336px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px]">
        <Pokemons />
        <Aside />
        <ModalPokemonInfo
          showModal={showPokemonDetail}
          onClick={closePokemonDetail}
        />
      </main>
    </section>
  );
}

export default App;

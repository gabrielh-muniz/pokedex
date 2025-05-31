import Pokemons from "./components/Pokemons";
import Aside from "./components/Aside";

function App() {
  return (
    <section className="bg-[#F6F8FC] h-screen overflow-y-auto">
      <main className="max-w-[1336px] mx-auto">
        {/*grid grid-cols-1 lg:grid-cols-[1fr_350px] -> this is for when aside is ready copy inside main class*/}
        <Pokemons />
        {/*<Aside />*/}
      </main>
    </section>
  );
}

export default App;

import { useState } from "react";
import useFetchPokemons from "../hooks/useFetchPokemons";
import useFetchAllPokemons from "../hooks/useFetchAllPokemons";
import { IoSearch, IoEllipsisHorizontalSharp } from "react-icons/io5";
import PokemonList from "./PokemonList";
import { ClipLoader } from "react-spinners";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";

function Pokemons() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 23;
  const offset = page * limit;

  const { pokemons, loading, error, count } = useFetchPokemons({
    limit,
    offset,
  });
  const { allPokemons } = useFetchAllPokemons();

  const filteredPokemons = searchTerm
    ? allPokemons.filter((p) => p.name.includes(searchTerm.toLowerCase()))
    : pokemons;

  const totalPages = Math.ceil(count / limit);

  return loading ? (
    <div className="h-screen flex justify-center items-center">
      <ClipLoader />
    </div>
  ) : (
    <section className="p-4 py-5">
      <form>
        <div className="bg-white p-3.5 flex rounded-2xl text-lg">
          <input
            className="outline-none flex-1 font-medium text-gray-700"
            type="text"
            placeholder="Search Pokemons..."
            name="pokemonName"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <button
            className="bg-red-500 text-white p-2 rounded-xl text-2xl shadow-md shadow-red-400 hover:bg-red-400 transition-colors"
            type="submit"
          >
            <IoSearch />
          </button>
        </div>
      </form>
      <PokemonList pokemons={filteredPokemons.slice(0, limit)} />
      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={<IoIosArrowBack />}
          nextLabel={<IoIosArrowForward />}
          breakLabel={<IoEllipsisHorizontalSharp />}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          forcePage={page}
          onPageChange={(selected) => setPage(selected.selected)}
          containerClassName="flex items-center gap-2"
          pageClassName=""
          pageLinkClassName="px-3 py-2 rounded-md cursor-pointer"
          activeClassName="py-0.5 bg-red-500 text-white rounded-md font-bold"
          previousLinkClassName="cursor-pointer"
          nextLinkClassName="cursor-pointer"
          breakLinkClassName="cursor-pointer"
          disabledLinkClassName="text-gray-300 cursor-not-allowed"
        />
      </div>
    </section>
  );
}
export default Pokemons;

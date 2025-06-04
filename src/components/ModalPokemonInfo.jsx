import { IoClose } from "react-icons/io5";

function ModalPokemonInfo({ showModal, onClick }) {
  return (
    <section
      className={`fixed top-0 left-0 right-0 bg-red-500 h-screen transition-all duration-400 ${showModal ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <button
        onClick={onClick}
        className="bg-white absolute top-4 right-4 text-2xl rounded-md hover:opacity-80 transition-opacity"
      >
        <IoClose />
      </button>
      <div
        className={`bg-white h-[85%] absolute w-full bottom-0 rounded-tl-3xl rounded-tr-3xl text-center ${showModal ? "translate-y-0" : "translate-y-full"} transition-transform duration-400`}
      >
        Pokemon
      </div>
    </section>
  );
}

export default ModalPokemonInfo;

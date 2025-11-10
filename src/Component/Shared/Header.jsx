import React from "react";
import { useCharacter } from "../../context/CharacterContext.jsx";
import logo from "../../../public/imagen/logo.png"; 

export default function Header() {
  const { favorites, showFavorites, setShowFavorites } = useCharacter();

  return (
    <header className="sticky top-0 z-40 shadow bg-emerald-700 text-white">
      {/* Barra superior con título */}
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Rick and Morty Finder Logo"
            className="w-12 h-12 rounded-full border-2 border-emerald-400"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Rick and Morty <span className="text-emerald-200">Finder</span>
          </h1>
        </div>

        {/* Navegación */}
        <nav className="flex items-center gap-4 mt-3 sm:mt-0">
          <button
            onClick={() => setShowFavorites(false)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
              !showFavorites
                ? "bg-emerald-500 text-white"
                : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
            }`}
          >
            🔎 Buscar
          </button>

          <button
            onClick={() => setShowFavorites(true)}
            className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
              showFavorites
                ? "bg-emerald-500 text-white"
                : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
            }`}
          >
            ❤️ Favoritos ({favorites.length})
          </button>
        </nav>
      </div>
    </header>
  );
}

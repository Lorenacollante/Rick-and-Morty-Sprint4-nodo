// src/Component/SearchBar.jsx

import React from "react";
import { useCharacter } from "../context/CharacterContext.jsx"; // Asegúrate de la ruta correcta

const SearchBar = () => {
  // Obtener el estado y el setter del Contexto
  const { searchTerm, setSearchTerm } = useCharacter();

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Escribe un nombre para buscar (ej: Rick)"
        // ✅ Conectar el valor
        value={searchTerm}
        // ✅ Conectar el setter
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border-2 border-purple-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
      />
    </div>
  );
};

export default SearchBar;

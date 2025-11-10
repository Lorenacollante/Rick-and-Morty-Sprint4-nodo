// src/components/CharacterCard.jsx

import React from "react";
// 🎯 Importar el hook de Contexto
import { useCharacter } from "../context/CharacterContext.jsx";

export default function CharacterCard({ character }) {
  
  // 💥 Consumir las funciones de Favoritos del Contexto
  const { isFavorite, addFavorite, removeFavorite } = useCharacter();

  const handleFavoriteClick = () => {
    // Si ya es favorito, lo eliminamos; si no, lo agregamos.
    if (isFavorite(character.id)) {
      removeFavorite(character.id, character.name);
    } else {
      addFavorite(character);
    }
  };

  const favoriteStatus = isFavorite(character.id);
  
  return (
    <div className="bg-white shadow-xl rounded-xl p-4 flex flex-col hover:scale-[1.02] transition duration-300 relative border-2 border-gray-100">
      
      {/* 1. Botón de Favorito */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 p-2 rounded-full shadow-lg z-10 
          ${favoriteStatus ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`
        }
        aria-label={favoriteStatus ? "Eliminar de favoritos" : "Agregar a favoritos"}
      >
        {/* Usamos un ícono de corazón para visualización */}
        {favoriteStatus ? '❤️' : '🤍'}
      </button>

      {/* 2. Imagen y Contenido */}
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-48 object-cover rounded-lg mb-3 shadow-md"
      />
      <h2 className="text-xl font-extrabold mt-2 text-gray-900 text-center truncate">
        {character.name}
      </h2>
      <div className="mt-2 text-sm space-y-1 flex-grow">
        <p className="text-gray-600 font-medium">
            <span className="font-bold text-gray-800">Especie:</span> {character.species}
        </p>
        {/* Mostrar el estado con un círculo de color (mejor experiencia Tailwind) */}
        <p className="text-gray-600 font-medium flex items-center">
            <span className="font-bold text-gray-800 mr-2">Estado:</span> 
            <span className={`w-3 h-3 rounded-full mr-2 
                ${character.status === 'Alive' ? 'bg-green-500' : 
                  character.status === 'Dead' ? 'bg-red-500' : 
                  'bg-gray-500'}`
            }></span>
            {character.status}
        </p>
        {/* Requisito: Agregar descripción (Locación) */}
        <p className="text-gray-600 font-medium">
          <span className="font-bold text-gray-800">Locación:</span> {character.location?.name || 'Desconocida'}
        </p>
      </div>

    </div>
  );
}
import React, { useState } from "react";
import { useCharacter } from "../context/CharacterContext.jsx";
import { toast } from "react-toastify";

export default function CharacterForm() {
  const { fetchCharactersByQuantity, loading, error } = useCharacter();
  const [cantidad, setCantidad] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const maxLimit = 30;
    if (cantidad < 1 || isNaN(cantidad) || cantidad > maxLimit) {
      toast.error(`Número inválido, debe ser entre 1 y ${maxLimit}.`);
      setLocalError(`Ingrese una cantidad entre 1 y ${maxLimit}.`);
      return;
    }
    setLocalError(null);

    await fetchCharactersByQuantity(Number(cantidad));
    setCantidad("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-3"
    >
      <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        placeholder="Cantidad de personajes "
        min="1"
        max="21"
        className="p-3 border-2 border-green-400 rounded-lg w-full text-center shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold"
      >
        {loading ? "Cargando..." : "Buscar por Cantidad"}
      </button>

      {(localError || error) && (
        <p className="text-red-500 text-sm mt-2">{localError || error}</p>
      )}
    </form>
  );
}
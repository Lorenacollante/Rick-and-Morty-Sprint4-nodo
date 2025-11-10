import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Variable de entorno (asegurate que exista en .env)
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CharacterContext = createContext();

// 📦 Cargar favoritos iniciales desde localStorage
const getInitialFavorites = () => {
  try {
    const stored = localStorage.getItem("favs");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error al cargar favoritos:", error);
    return [];
  }
};

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(getInitialFavorites);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeSearchType, setActiveSearchType] = useState("none");

  // 💾 Guardar favoritos cada vez que cambian
  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favorites));
  }, [favorites]);

  // 💖 Funciones para manejar favoritos
  const isFavorite = (id) => favorites.some((char) => char.id === id);

  const addFavorite = (char) => {
    if (!isFavorite(char.id)) {
      setFavorites((prev) => [...prev, char]);
      toast.success(`${char.name} agregado a favoritos.`);
    } else {
      toast.warn(`${char.name} ya estaba en favoritos.`);
    }
  };

  const removeFavorite = (id, name) => {
    setFavorites((prev) => prev.filter((char) => char.id !== id));
    toast.info(`${name} eliminado de favoritos.`);
  };

  // 🔍 Buscar personajes por nombre o filtros
  const fetchFilteredCharacters = useCallback(
    async ({ name, species, status, gender }) => {
      if (!name && !species && !status && !gender) {
        setCharacters([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Construcción dinámica de la URL
        let url = `${BASE_URL}?`;
        const params = [];
        if (name) params.push(`name=${name}`);
        if (species) params.push(`species=${species}`);
        if (status) params.push(`status=${status}`);
        if (gender) params.push(`gender=${gender}`);
        url += params.join("&");

        const response = await axios.get(url);
        setCharacters(response.data.results || []);

        const total = response.data.results?.length || 0;
        toast.success(
          total > 0
            ? `Mostrando ${total} resultados.`
            : `No se encontraron personajes.`
        );
      } catch (err) {
        console.error("❌ Error en fetchFilteredCharacters:", err);
        setCharacters([]);
        setError("Error al cargar datos.");
        toast.error(
          err.response?.status === 404
            ? "No se encontraron personajes."
            : "Error al conectar con la API."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 🎲 Buscar personajes aleatorios por cantidad
  const fetchCharactersByQuantity = useCallback(async (quantity) => {
    setLoading(true);
    setError(null);
    setCharacters([]);
    setSearchTerm("");
    setFilterSpecies("");
    setFilterStatus("");
    setFilterGender("");
    setActiveSearchType("quantity");

    try {
      // Generar IDs aleatorios (Rick and Morty tiene 826 personajes)
      const randomIds = Array.from(
        { length: quantity },
        () => Math.floor(Math.random() * 826) + 1
      );

      const url = `${BASE_URL}/${randomIds.join(",")}`;
      const response = await axios.get(url);

      const results = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setCharacters(results);
      toast.success(`Mostrando ${results.length} personajes aleatorios.`);
    } catch (err) {
      console.error("❌ Error en fetchCharactersByQuantity:", err);
      toast.error("Error al obtener personajes aleatorios.");
      setError("Error al cargar datos por cantidad.");
      setActiveSearchType("none");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🎯 useEffect principal para búsquedas por nombre/filtros
  useEffect(() => {
    if (showFavorites) {
      setCharacters([]);
      return;
    }

    const isAnyFilterActive =
      searchTerm.trim() || filterSpecies || filterStatus || filterGender;

    if (!isAnyFilterActive) {
      setCharacters([]);
      setError(null);
      setActiveSearchType("none");
      return;
    }

    setActiveSearchType("name");

    const handler = setTimeout(() => {
      fetchFilteredCharacters({
        name: searchTerm,
        species: filterSpecies,
        status: filterStatus,
        gender: filterGender,
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [
    searchTerm,
    filterSpecies,
    filterStatus,
    filterGender,
    showFavorites,
    fetchFilteredCharacters,
  ]);

  // 🎁 Valor del contexto
  const contextValue = {
    characters,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterSpecies,
    setFilterSpecies,
    filterStatus,
    setFilterStatus,
    filterGender,
    setFilterGender,
    fetchCharactersByQuantity,
    fetchFilteredCharacters,
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    showFavorites,
    setShowFavorites,
    activeSearchType,
    setActiveSearchType,
  };

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
};

// 🪄 Hook personalizado para usar el contexto
export const useCharacter = () => useContext(CharacterContext);

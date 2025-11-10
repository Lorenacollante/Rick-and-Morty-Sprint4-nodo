// src/App.jsx

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1️⃣ CONTEXTO
import { useCharacter } from "./context/CharacterContext.jsx";

// 2️⃣ COMPONENTES PRINCIPALES
import SearchBar from "./Component/SearchBar.jsx";
import CharacterCard from "./Component/CharacterCard.jsx";
import CharacterForm from "./Component/CharacterForm.jsx";
import Loader from "./Component/Shared/Loader.jsx";

// 3️⃣ HEADER y FOOTER
import Header from "./Component/Shared/Header.jsx";
import Footer from "./Component/Shared/Footer.jsx";

function App() {
  // ✅ VARIABLES DEL CONTEXTO
  const {
    characters,
    loading,
    error,
    favorites,
    showFavorites,
    setShowFavorites,
    filterGender,
    setFilterGender,
  } = useCharacter();

  // 🔎 FUNCIÓN PARA RENDERIZAR CONTENIDO PRINCIPAL
  const renderContent = () => {
    if (showFavorites) {
      if (favorites.length === 0) {
        return (
          <p className="text-center text-xl text-gray-500 mt-10">
            Aún no tienes personajes favoritos. ¡Agrégalos!
          </p>
        );
      }
      return favorites.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ));
    }

    if (loading) return <Loader />;
    if (error)
      return <p className="text-center text-2xl text-red-600 mt-10">{error}</p>;

    if (characters.length === 0) {
      return (
        <p className="text-center text-xl text-gray-500 mt-10">
          Usa los controles de búsqueda para empezar o no se encontraron
          resultados.
        </p>
      );
    }

    return characters.map((char) => (
      <CharacterCard key={char.id} character={char} />
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* 🧭 HEADER GLOBAL */}
      <Header />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow">
        <div className="container mx-auto p-4 sm:p-8">
          <div className="flex justify-center gap-4 mb-8 mt-6">
            {/* Botón Búsqueda */}
            <button
              onClick={() => setShowFavorites(false)}
              className={`py-2 px-5 rounded-full font-semibold transition duration-300 ${
                !showFavorites
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              🔎 Búsqueda de Personajes
            </button>

            {/* Botón Favoritos */}
            <button
              onClick={() => setShowFavorites(true)}
              className={`py-2 px-5 rounded-full font-semibold transition duration-300 ${
                showFavorites
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ❤️ Mis Favoritos ({favorites.length})
            </button>
          </div>

          {/* 🎯 FORMULARIOS Y FILTROS */}
          {!showFavorites && (
            <div className="flex flex-col gap-4 mb-8 p-4 bg-white shadow-lg rounded-xl">
              {/* Filtro de Género */}
              <div className="flex justify-center items-center gap-4 p-2 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700">
                  Filtro de Género:
                </h3>
                <select
                  value={filterGender}
                  onChange={(e) => setFilterGender(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">-- Todos --</option>
                  <option value="female">Femenino</option>
                  <option value="male">Masculino</option>
                  <option value="genderless">Sin Género</option>
                  <option value="unknown">Desconocido</option>
                </select>
              </div>

              {/* Sección de búsqueda */}
              <div className="flex flex-col md:flex-row justify-center items-start gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl font-semibold mb-2 text-emerald-700 text-center">
                    Buscar por Nombre
                  </h3>
                  <SearchBar />
                </div>

                <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-8 border-gray-200">
                  <h3 className="text-xl font-semibold mb-2 text-emerald-700 text-center">
                    Buscar por Cantidad
                  </h3>
                  <CharacterForm />
                </div>
              </div>
            </div>
          )}

          {/* 🧩 RESULTADOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* ⚡ FOOTER GLOBAL */}
      <Footer />

      {/* 🔔 TOASTS */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;

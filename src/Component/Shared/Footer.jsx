export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-emerald-100 mt-16 pt-10 pb-6">
      <div className="container mx-auto px-4">
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-emerald-700 pb-8">
          {/* COLUMNA 1 */}
          <div>
            <h2 className="text-2xl font-bold text-emerald-300 mb-4">
              Rick and Morty Finder
            </h2>
            <p className="text-sm leading-relaxed text-emerald-100/80">
              Proyecto educativo realizado con React, Tailwind y Axios.
              <br />
              Busca, filtra y guarda tus personajes favoritos.
            </p>
            <h2> Creadora:Lorena Collante </h2>
          </div>

          {/* COLUMNA 2 */}
          <div>
            <h4 className="text-xl font-semibold text-emerald-200 mb-3">
              Recursos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://rickandmortyapi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition"
                >
                  Rick and Morty API Oficial
                </a>
              </li>
              <li>
                <a
                  href="https://vitejs.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition"
                >
                  Framework: Vite + React
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3 */}
          <div>
            <h4 className="text-xl font-semibold text-emerald-200 mb-3">
              Contacto
            </h4>
            <ul className="space-y-1 text-sm">
              <li>📧 contacto@rickfinder.com</li>
              <li>🌐 Proyecto académico – 2025</li>
              <li>📍 Escuela Secundaria Técnica</li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center pt-6 text-sm text-emerald-400/80">
          <p>
            &copy; {new Date().getFullYear()} Rick and Morty Finder — Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

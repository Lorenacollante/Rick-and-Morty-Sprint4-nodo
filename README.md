# React + Vite

Rick and Morty Character Finder
Proyecto desarrollado como parte del proceso de aprendizaje de React y la gestión de estado centralizada a través del Context API, junto con buenas prácticas de optimización de peticiones a la API.
Utilize la Api sugerida, la verdad no veo estos programas. 
 Características Principales
Esta aplicación permite a los usuarios buscar personajes del universo de Rick and Morty de tres maneras distintas y gestionar sus favoritos de forma persistente:
1.	Búsqueda Reactiva por Nombre:
o	Filtra personajes a medida que el usuario escribe, con una optimización por Debounce (retraso de 500ms) para evitar sobrecargar la API.
2.	Búsqueda Aleatoria por Cantidad:
o	Permite solicitar una cantidad específica de personajes aleatorios (hasta 20) utilizando la funcionalidad de IDs múltiples de la API.
3.	Busqueda x filtro  según el genero:

4.	Gestión de Favoritos:
o	Los personajes se pueden añadir o eliminar de una lista de favoritos.
o	La lista se mantiene persistente utilizando localStorage del navegador.
o	Se puede alternar la vista entre los resultados de la búsqueda y la lista de favoritos.
Explicación de la Arquitectura (Decisiones Clave)
 Patrón Context API de React como solución de gestión de estado para este proyecto.
1. Centralización de la Lógica
¿Por qué Contexto? Toda la lógica de la aplicación (la búsqueda, la carga, los errores, y la gestión de favoritos) está centralizada en un único archivo: src/context/CharacterContext.jsx.
•	Ventaja: Todos los demás componentes (SearchBar, CharacterCard, CharacterForm) acceden a los datos y funciones desde una fuente única y compartida, evitando pasar información a través de muchos niveles de componentes.
2. Optimización de Búsqueda (Debouncing)
¿Por qué Debounce? La búsqueda por nombre solo se dispara a la API después de que el usuario ha dejado de escribir por 500 milisegundos.
•	Ventaja: Esto protege el servidor de la API de Rick and Morty contra un exceso de peticiones, ya que solo se envía la búsqueda final, optimizando la experiencia de usuario y el uso de recursos.
•	Ventaja: Esto permite obtener múltiples personajes en una sola petición HTTP, siendo mucho más rápido y eficiente que hacer un bucle de N peticiones individuales.
⚙️ Configuración del Entorno (.env)
Aunque la API de Rick and Morty es pública y no requiere clave, si el proyecto escalara y usáramos una API que sí la requiera, la URL base se gestionaría a través del archivo de variables de entorno. Que pidiooo mi profe Lucas ….
Uso: La URL principal de la API (VITE_API_BASE_URL) debe definirse en un archivo .env en la raíz del proyecto para asegurar que las credenciales o URLs de servicio se mantengan privadas.

1.	Instalar dependencias:
2.	npm install
3.	Ejecutar el proyecto en modo desarrollo:
4.	npm run dev

El proyecto se abrirá en http://localhost:5173.
🔗 Despliegue (Netlify)
URL del Proyecto Desplegado: https://verdant-semolina-0b803b.netlify.app/



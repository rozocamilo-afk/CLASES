// --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
// Obtenemos las referencias a los elementos HTML que vamos a necesitar [cite: 201-204]
const pokemonInput = document.getElementById('pokemonInput');
const buscarBtn = document.getElementById('buscarBtn');
const pokemonInfoDiv = document.getElementById('pokemonInfo');

// --- 2. MANEJO DE EVENTOS ---
// Escuchamos el evento 'click' en el botón de búsqueda [cite: 206]
buscarBtn.addEventListener('click', () => {
    // Obtenemos el valor del input y limpiamos espacios [cite: 207]
    const pokemonName = pokemonInput.value.trim();

    // Validamos que el input no esté vacío [cite: 208-212]
    if (pokemonName) {
        obtenerDatosPokemon(pokemonName);
    } else {
        mostrarError('Por favor, introduce un nombre de Pokémon');
    }
});

// --- 3. FUNCIÓN ASÍNCRONA PARA CONSUMIR LA API (con Async/Await) ---
// Esta es la versión moderna (Clase 11, Página 22) [cite: 262-286]
async function obtenerDatosPokemon(pokemonName) {
    // Mostramos un estado de carga mientras buscamos [cite: 221]
    pokemonInfoDiv.innerHTML = '<p>Buscando Pokémon...</p>';

    try {
        // Construimos la URL de la API [cite: 219]
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
        
        // Usamos 'await' para esperar la respuesta de fetch [cite: 270]
        const response = await fetch(url);

        // Verificamos si la respuesta fue exitosa (código 200-299)
        if (!response.ok) {
            // Manejamos el error 404 (No encontrado) [cite: 229-231]
            if (response.status === 404) {
                throw new Error(`Pokémon "${pokemonName}" no encontrado.`);
            } else {
                // Manejamos otros errores de servidor
                throw new Error(`Error de red: ${response.status}`);
            }
        }

        // Convertimos la respuesta a JSON [cite: 280]
        const data = await response.json();
        
        // Llamamos a la función para mostrar los datos
        mostrarDatosPokemon(data);

    } catch (error) {
        // Capturamos cualquier error (404, de red, etc.) y lo mostramos [cite: 283-284]
        mostrarError(error.message);
    }
}

// --- 4. FUNCIÓN PARA MOSTRAR LOS DATOS EN EL DOM ---
// (Clase 11, Página 20) [cite: 236-250]
function mostrarDatosPokemon(data) {
    // Extraemos los datos que nos interesan del JSON [cite: 239-244]
    const nombre = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const pokedexId = data.id;
    const altura = (data.height / 10).toFixed(1); // Convertir de decímetros a metros
    const peso = (data.weight / 10).toFixed(1);   // Convertir de hectogramos a kg
    
    // Usamos .map() para extraer los nombres de los tipos
    const tipos = data.types.map(typeInfo => 
        typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)
    ).join(', '); // Unimos la lista con comas

    // Usamos .map() para extraer los nombres de las habilidades
    const habilidades = data.abilities.map(abilityInfo => 
        abilityInfo.ability.name
            .replace('-', ' ') // Quitamos guiones
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizamos cada palabra
            .join(' ')
    ).join(', ');

    const imagenSprite = data.sprites.front_default; // URL de la imagen

    // Creamos el HTML que se va a insertar en el div [cite: 245-249]
    pokemonInfoDiv.innerHTML = `
        <h3>${nombre} #${pokedexId}</h3>
        <img src="${imagenSprite}" alt="Imagen de ${nombre}">
        <p><strong>Altura:</strong> ${altura} m</p>
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Tipo(s):</strong> ${tipos}</p>
        <p><strong>Habilidades:</strong> ${habilidades}</p>
    `;
}

// --- 5. FUNCIÓN PARA MOSTRAR ERRORES ---
// (Clase 11, Página 21) [cite: 251-258]
function mostrarError(mensaje) {
    pokemonInfoDiv.innerHTML = `
        <div class="error">
            <p>${mensaje}</p>
        </div>
    `;
}
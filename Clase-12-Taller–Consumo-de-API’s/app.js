// --- Taller Clase 11: Consumo de APIs ---

// 1. Esperamos a que todo el contenido del DOM esté cargado antes de ejecutar el script.
// Esto evita errores si el script intenta seleccionar elementos que aún no existen.
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

// 2. Definimos la URL de la API que vamos a consumir [cite: 2879]
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// 3. Seleccionamos el contenedor donde insertaremos las tarjetas
const userContainer = document.getElementById('user-container');


/**
 * 4. Función principal ASÍNCRONA para obtener los datos de los usuarios.
 * Usamos la sintaxis moderna async/await [cite: 2883]
 */
async function fetchUsers() {
    
    // Mostramos un estado de carga mientras se obtienen los datos [cite: 1597]
    userContainer.innerHTML = '<p>Cargando usuarios...</p>';

    try {
        // 'await' pausa la ejecución hasta que la promesa de fetch se resuelva
        const response = await fetch(API_URL);

        // Verificamos si la respuesta del servidor fue exitosa (ej. 404, 500) [cite: 1481, 1549]
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        // Convertimos la respuesta a JSON (esto también es una promesa)
        const users = await response.json();

        // Llamamos a la función para mostrar los usuarios en el DOM
        displayUsers(users);

    } catch (error) {
        // Manejamos cualquier error (de red, 404, etc.) [cite: 2910]
        console.error('Error al obtener los usuarios:', error);
        mostrarError(error.message);
    }
}

/**
 * 5. Función para crear y mostrar las tarjetas de usuario en el DOM [cite: 2900]
 */
function displayUsers(users) {
    // Limpiamos el mensaje de "Cargando..."
    userContainer.innerHTML = '';

    // Iteramos sobre el array de usuarios (con forEach, como vimos en la Clase 10)
    users.forEach(user => {
        // 5.1. Creamos un nuevo elemento <div> para la tarjeta
        const card = document.createElement('div');
        // 5.2. Añadimos la clase CSS para que tome los estilos
        card.classList.add('user-card');

        // 5.3. Extraemos los datos requeridos (nombre, email, ciudad) [cite: 2884]
        // Verificamos la estructura del JSON: 'city' está dentro de 'address'
        const nombre = user.name;
        const email = user.email;
        const ciudad = user.address.city;

        // 5.4. Llenamos la tarjeta con el HTML correspondiente
        card.innerHTML = `
            <h3>${nombre}</h3>
            <p><strong>Email:</strong> <a href="mailto:${email}" class="email-link">${email}</a></p>
            <p><strong>Ciudad:</strong> ${ciudad}</p>
        `;

        // 5.5. Añadimos la tarjeta al contenedor en el HTML
        userContainer.appendChild(card);
    });
}

/**
 * 6. Función para mostrar un mensaje de error en el DOM
 */
function mostrarError(mensaje) {
    userContainer.innerHTML = `
        <div class="error">
            <p>¡Oops! Algo salió mal.</p>
            <p>${mensaje}</p>
        </div>
    `;
}
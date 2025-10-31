import React, { useState } from 'react';

function Contador() {
  // 1. Inicializamos el estado 'contador' con un valor inicial de 0.
  const [contador, setContador] = useState(0);

  // 2. Creamos funciones para manejar la lógica de cambio de estado.
  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);
  const resetear = () => setContador(0);

  return (
    <div>
      {/* 3. Mostramos el valor actual del estado. */}
      <h2>Contador: {contador}</h2>
      <div>
        {/* 4. Al hacer clic, llamamos a las funciones que actualizan el estado. */}
        <button onClick={decrementar}>-</button>
        <button onClick={resetear}>Reset</button>
        <button onClick={incrementar}>+</button>
      </div>
      {/* 5. Un ejemplo de renderizado condicional. */}
      {contador < 0 && (
        <p>¡El contador es negativo!</p>
      )}
    </div>
  );
}

export default Contador;
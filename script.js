// Añadimos un evento al formulario para que ejecute una función cuando se envíe
document.getElementById('simulationForm').addEventListener('submit', function(e) {
    // Evitamos que el formulario se envíe de la manera tradicional, que recargaría la página
    e.preventDefault();  

    // Obtenemos el número de simulaciones ingresado por el usuario, convirtiendo el valor del campo de entrada a un número entero
    const numSimulations = parseInt(document.getElementById('simulations').value);
    
    // Calculamos el resultado exacto de la integral usando la función calculateExactIntegral
    const exactResult = calculateExactIntegral();
    
    // Calculamos el resultado aproximado usando el método de Monte Carlo con la función monteCarloIntegral, pasándole el número de simulaciones
    const approxResult = monteCarloIntegral(numSimulations);
    
    // Calculamos el porcentaje de error entre el resultado exacto y el aproximado utilizando la función calculateErrorPercentage
    const errorPercentage = calculateErrorPercentage(exactResult, approxResult);

    // Mostramos los resultados en la página actualizando el contenido de los elementos HTML correspondientes
    document.getElementById('exactResult').textContent = exactResult;
    document.getElementById('approxResult').textContent = approxResult.toFixed(5); // Redondeamos el resultado aproximado a 5 decimales
    document.getElementById('errorPercentage').textContent = errorPercentage.toFixed(2); // Redondeamos el porcentaje de error a 2 decimales

    // Mostramos el div de resultados cambiando su estilo para que sea visible
    document.getElementById('results').style.display = 'block';
});

// Función para calcular el resultado exacto de la integral
function calculateExactIntegral() {
    // La integral de 465x + 3x dx es 465x^2/2 + 3x^2/2 + C
    // Calculamos el valor exacto de la integral en el rango de 0 a 1
    // 465x^2/2 + 3x^2/2 evaluado en x = 1
    return (465 * Math.pow(1, 2) / 2) + (3 * Math.pow(1, 2) / 2);
}

// Función para calcular la integral usando el método de Monte Carlo
function monteCarloIntegral(numSimulations) {
    let sum = 0; // Inicializamos la suma total en 0

    // Ejecutamos un bucle tantas veces como simulaciones haya ingresado el usuario
    for (let i = 0; i < numSimulations; i++) {
        // Generamos un número aleatorio entre 0 y 1
        const x = Math.random();
        
        // Evaluamos la función 465x + 3x en el punto x y sumamos el resultado a la suma total
        sum += (465 * x + 3 * x);
    }

    // Dividimos la suma total por el número de simulaciones para obtener el valor promedio
    return sum / numSimulations;
}

// Función para calcular el porcentaje de error entre el valor exacto y el valor aproximado
function calculateErrorPercentage(exact, approx) {
    // Calculamos el error absoluto restando el valor aproximado del valor exacto, 
    // luego dividimos el resultado por el valor exacto y multiplicamos por 100 para obtener el porcentaje
    return Math.abs((exact - approx) / exact) * 100;
}

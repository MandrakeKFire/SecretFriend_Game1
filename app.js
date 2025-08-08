// Crear un array para almacenar los nombres:
let amigos = [];

// Creamos un temporizador para las alertas visuales:
let temporizadorAlerta;

// Muestra un mensaje de alerta en la pantalla:
function mostrarAlerta(mensaje) {
    const alerta = document.getElementById('alerta-error');
    alerta.textContent = mensaje;
    alerta.classList.add('visible');

    clearTimeout(temporizadorAlerta);

    temporizadorAlerta = setTimeout(() => {
        alerta.classList.remove('visible');
    }, 3000);
}

// Implementa una función para agregar amigos
// que permita al usuario ingresar un nombre
// en el campo de texto y añadirlo a la lista de amigos creada anteriormente.
function agregarAmigo() {
    const inputAmigo = document.getElementById('nombre-amigo');
    const nombreAmigo = inputAmigo.value.trim();

    if (nombreAmigo === '') {
        mostrarAlerta("Por favor, inserte un nombre.");
        return;
    }

    // Este patrón verifica si hay algún carácter que NO sea una letra (incluyendo acentos/ñ) o un espacio.
    const patron = /[^A-Za-zñÑáéíóúÁÉÍÓÚ ]/;
    if (patron.test(nombreAmigo)) {
        mostrarAlerta("El nombre solo puede contener letras y espacios.");
        return;
    }
    // Mostramos un mensaje de alerta en caso de que el nombre que usamos ya ha sido usado:
    if (amigos.includes(nombreAmigo)) {
        mostrarAlerta('Este nombre ya ha sido agregado.');
        return;
    }

    amigos.push(nombreAmigo);
    inputAmigo.value = '';
    inputAmigo.focus();
    actualizarLista();
    
    // Función estética para devolver el color
    // gris al botón "Añadir" si es que no hay
    // carácteres en el cuadro de texto:
    inputAmigo.dispatchEvent(new Event('input'));
}

// Se implementa una función para actualizar la lista de amigos:
function actualizarLista() {
    const lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';
    for (let i = 0; i < amigos.length; i++) {
        lista.innerHTML += `<li>${amigos[i]}</li>`;
    }
}

// Función para realizar el sorteo del amigo secreto:
function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarAlerta("Debes agregar al menos dos amigos para poder sortear.");
        return;
    }
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];
    const resultado = document.getElementById('resultado-sorteo');
    resultado.innerHTML = `¡El amigo secreto es: <strong>${amigoSecreto}</strong>! 🎉`;
}

// Función para reiniciar el juego por completo:
function reiniciar() {
    amigos = [];
    document.getElementById('lista-amigos').textContent = '';
    document.getElementById('resultado-sorteo').textContent = '';
    const inputAmigo = document.getElementById('nombre-amigo');
    inputAmigo.value = '';
    document.getElementById('alerta-error').classList.remove('visible');

    inputAmigo.dispatchEvent(new Event('input'));
}

// Se agregó una indicación para ingresar nombres
// directamente presionando el botón "Enter":
const input = document.getElementById('nombre-amigo');
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        agregarAmigo();
    }
});

// Se agregó una función para cambiar el color del
// botón "Añadir", de manera que cambie de color
// gris a verde cuando hay caracteres dentro del
// cuadro de texto:
const botonAnadir = document.querySelector('.button-add');
input.addEventListener('input', function() {
    if (input.value.trim().length > 0) {
        botonAnadir.classList.add('button-add--active');
    } else {
        botonAnadir.classList.remove('button-add--active');
    }
});

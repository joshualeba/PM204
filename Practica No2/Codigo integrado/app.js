// --- Módulos necesarios ---
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- Sección cocina ---
const catalogo = [];

function crearProducto(id, nombre, precio) {
    catalogo.push({ id: id, nombre: nombre, precio: precio });
}

function actualizarPrecio(idProducto, nuevoPrecio) {
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].id === idProducto) {
            catalogo[i].precio = nuevoPrecio;
        }
    }
}

// --- Sección caja ---
let listaPedidos = [];
let totalAcumulado = 0;

function agregarPedido(idProducto) {
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].id === idProducto) {
            listaPedidos.push(catalogo[i]);
            totalAcumulado += catalogo[i].precio;
        }
    }
}

function eliminarPedido(idProducto) {
    for (let i = 0; i < listaPedidos.length; i++) {
        if (listaPedidos[i].id === idProducto) {
            totalAcumulado -= listaPedidos[i].precio;
            listaPedidos.splice(i, 1);
            break;
        }
    }
}

// --- Sección cliente ---
function mostrarMenu() {
    console.log(`\n=================================`);
    console.log(`          MENÚ DEL DÍA           `);
    console.log(`=================================`);
    
    if (catalogo.length === 0) {
        console.log(` El catálogo está vacío.`);
    } else {
        for (let i = 0; i < catalogo.length; i++) {
            console.log(` [${catalogo[i].id}] ${catalogo[i].nombre} -> $${catalogo[i].precio}`);
        }
    }
    console.log(`=================================\n`);
}

function mostrarPedidos() {
    console.log(`\n---------------------------------`);
    console.log(`          TICKET DE CAJA         `);
    console.log(`---------------------------------`);
    
    if (listaPedidos.length === 0) {
        console.log(` No hay pedidos registrados.`);
    } else {
        for (let i = 0; i < listaPedidos.length; i++) {
            console.log(` * ${listaPedidos[i].nombre} -> $${listaPedidos[i].precio}`);
        }
    }
    
    console.log(`---------------------------------`);
    console.log(` TOTAL A PAGAR: $${totalAcumulado}`);
    console.log(`---------------------------------\n`);
}

// --- Ejecución interactiva ---
function iniciarSistema() {
    console.log("\n--- PANEL GENERAL ---");
    console.log("1. Crear un producto nuevo");
    console.log("2. Mostrar el menú");
    console.log("3. Hacer un pedido");
    console.log("4. Ver el ticket final");
    console.log("5. Salir");

    readline.question("Elige una opción numérica: ", (opcion) => {
        if (opcion === "1") {
            readline.question("Escribe el ID del producto (número): ", (id) => {
                readline.question("Escribe el nombre: ", (nombre) => {
                    readline.question("Escribe el precio: ", (precio) => {
                        crearProducto(Number(id), nombre, Number(precio));
                        console.log("¡Producto guardado exitosamente!");
                        iniciarSistema();
                    });
                });
            });
        } else if (opcion === "2") {
            mostrarMenu();
            iniciarSistema();
        } else if (opcion === "3") {
            readline.question("Escribe el ID del producto que deseas pedir: ", (id) => {
                agregarPedido(Number(id));
                console.log("¡Se agregó a tu cuenta!");
                iniciarSistema();
            });
        } else if (opcion === "4") {
            mostrarPedidos();
            iniciarSistema();
        } else if (opcion === "5") {
            console.log("Cerrando el sistema. ¡Hasta luego!");
            readline.close();
        } else {
            console.log("Esa opción no es válida. Intenta de nuevo.");
            iniciarSistema();
        }
    });
}

iniciarSistema();
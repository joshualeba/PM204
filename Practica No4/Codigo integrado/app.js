const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const catalogo = [];
let listaPedidos = [];
let ultimoIdProducto = 0;

function crearProducto(nombre, precio, categoria) {
    if (!nombre.trim()) {
        console.log("\n[ERROR] El nombre del producto no puede estar vacio.");
        return false;
    }
    if (isNaN(precio) || precio <= 0) {
        console.log("\n[ERROR] El precio debe ser un numero mayor a 0.");
        return false;
    }
    const catFormateada = categoria.trim().toLowerCase();
    if (catFormateada !== "plato" && catFormateada !== "bebida" && catFormateada !== "postre") {
        console.log("\n[ERROR] La categoria debe ser: plato, bebida o postre.");
        return false;
    }

    ultimoIdProducto++;
    catalogo.push({ id: ultimoIdProducto, nombre: nombre.trim(), precio: Number(precio), categoria: catFormateada });
    console.log(`\n[EXITO] Producto creado con el ID: ${ultimoIdProducto}`);
    return true;
}

function buscarProducto(idProducto) {
    return catalogo.find(p => p.id === idProducto);
}

function obtenerProductosBaratos(precioMax) {
    return catalogo.filter(p => p.precio <= precioMax);
}

function obtenerProductosCaros(precioMin) {
    return catalogo.filter(p => p.precio >= precioMin);
}

function obtenerPorCategoria(categoria) {
    return catalogo.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
}

function agregarPedido(idProducto) {
    if (isNaN(idProducto) || idProducto <= 0) {
        console.log("\n[ERROR] Ingresa un ID numerico valido.");
        return false;
    }
    const producto = buscarProducto(idProducto);
    if (producto) {
        listaPedidos.push(producto);
        console.log(`\n[AGREGADO] '${producto.nombre}' se añadio a tus pedidos.`);
        return true;
    }
    console.log(`\n[ERROR] El producto con ID ${idProducto} no existe.`);
    return false;
}

function calcularTotal() {
    const subtotal = listaPedidos.reduce((acum, { precio }) => acum + precio, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    return { subtotal, iva, total };
}

function filtrarPedidosPorCategoria(categoria) {
    return listaPedidos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
}

function procesarNotificacionCaja(estado, motivo, callback) {
    if (estado === "pedido listo") {
        callback("Caja notificada: Pedido completado y cobrado de forma exitosa.");
    } else {
        callback(`Caja notificada: Pedido cancelado debido a: ${motivo}.`);
    }
}

function prepararPedido(opcionSimulacion) {
    return new Promise((resolve, reject) => {
        if (opcionSimulacion === 1) {
            resolve("Cafe preparado con exito");
        } else if (opcionSimulacion === 2) {
            reject("error en cocina");
        } else if (opcionSimulacion === 3) {
            reject("falta ingrediente");
        } else {
            reject("opcion invalida");
        }
    });
}

function actualizarEstadoPedido(opcionSimulacion) {
    console.log("\n=========================================");
    console.log("       PROCESANDO PEDIDO ASINCRONO       ");
    console.log("=========================================");
    console.log("[Cliente] Estado: Pedido recibido...");
    
    setTimeout(() => {
        console.log("[Cliente] Estado: Preparando.........");
        setTimeout(() => {
            console.log("[Cliente] Estado: Empacando.........");
            setTimeout(() => {
                prepararPedido(opcionSimulacion)
                    .then((resultado) => {
                        console.log("[Cliente] Estado: Pedido Entregado");
                        console.log("-----------------------------------------");
                        procesarNotificacionCaja("pedido listo", resultado, (mensaje) => {
                            console.log(`[Caja] ${mensaje}`);
                            console.log("=========================================");
                            iniciarSistema();
                        });
                    })
                    .catch((error) => {
                        console.log("[Cliente] Estado: Pedido Cancelado");
                        console.log("-----------------------------------------");
                        procesarNotificacionCaja("pedido cancelado", error, (mensaje) => {
                            console.log(`[Caja] ${mensaje}`);
                            console.log("=========================================");
                            iniciarSistema();
                        });
                    });
            }, 1200);
        }, 1200);
    }, 1200);
}

function mostrarMenu() {
    console.log("\n=========================================");
    console.log("              MENU DEL DIA               ");
    console.log("=========================================");
    if (catalogo.length === 0) {
        console.log("  El catalogo esta vacio.");
    } else {
        const menuForm = catalogo.map(p => `  [ID: ${p.id}] ${p.nombre} (${p.categoria}) - $${p.precio.toFixed(2)}`);
        menuForm.forEach(item => console.log(item));
    }
    console.log("=========================================");
}

function mostrarFiltrosProductos() {
    console.log("\n=========================================");
    console.log("          FILTRADO DE PRODUCTOS          ");
    console.log("=========================================");
    
    console.log("\n---> Productos Baratos (<= $50):");
    const baratos = obtenerProductosBaratos(50);
    if (baratos.length === 0) console.log("  No hay productos.");
    else baratos.forEach(p => console.log(`  - ${p.nombre}: $${p.precio.toFixed(2)}`));

    console.log("\n---> Productos Caros (>= $100):");
    const caros = obtenerProductosCaros(100);
    if (caros.length === 0) console.log("  No hay productos.");
    else caros.forEach(p => console.log(`  - ${p.nombre}: $${p.precio.toFixed(2)}`));

    console.log("\n---> Bebidas:");
    const bebidas = obtenerPorCategoria("bebida");
    if (bebidas.length === 0) console.log("  No hay bebidas.");
    else bebidas.forEach(p => console.log(`  - ${p.nombre}: $${p.precio.toFixed(2)}`));
    
    console.log("\n---> Postres:");
    const postres = obtenerPorCategoria("postre");
    if (postres.length === 0) console.log("  No hay postres.");
    else postres.forEach(p => console.log(`  - ${p.nombre}: $${p.precio.toFixed(2)}`));
    console.log("=========================================");
}

function mostrarFiltrosPedidos(categoria) {
    const catLimpia = categoria.trim().toLowerCase();
    if (catLimpia !== "plato" && catLimpia !== "bebida" && catLimpia !== "postre") {
        console.log("\n[ERROR] Categoria de filtro no valida.");
        return;
    }
    console.log("\n=========================================");
    console.log(`     PEDIDOS FILTRADOS: ${catLimpia.toUpperCase()}      `);
    console.log("=========================================");
    const filtrados = filtrarPedidosPorCategoria(catLimpia);
    if (filtrados.length === 0) {
        console.log("  No hay pedidos de esta categoria.");
    } else {
        filtrados.forEach(p => console.log(`  * ${p.nombre} -> $${p.precio.toFixed(2)}`));
        const subtotal = filtrados.reduce((acum, { precio }) => acum + precio, 0);
        const iva = subtotal * 0.16;
        const total = subtotal + iva;
        console.log("-----------------------------------------");
        console.log(`  Subtotal Categoria: $${subtotal.toFixed(2)}`);
        console.log(`  IVA Categoria:      $${iva.toFixed(2)}`);
        console.log(`  Total Categoria:     $${total.toFixed(2)}`);
    }
    console.log("=========================================");
}

function mostrarTicket() {
    console.log("\n=========================================");
    console.log("            TICKET DE COMPRA             ");
    console.log("=========================================");
    if (listaPedidos.length === 0) {
        console.log("  No hay pedidos registrados.");
    } else {
        listaPedidos.forEach(({ nombre, precio }) => {
            console.log(`  * ${nombre.padEnd(20)} $${precio.toFixed(2)}`);
        });
        
        const { subtotal, iva, total } = calcularTotal();
        console.log("-----------------------------------------");
        console.log(`  SUBTOTAL:            $${subtotal.toFixed(2)}`);
        console.log(`  IVA (16%):           $${iva.toFixed(2)}`);
        console.log(`  TOTAL NETO:          $${total.toFixed(2)}`);
    }
    console.log("=========================================");
}

function iniciarSistema() {
    console.log("\n=========================================");
    console.log("          SISTEMA DE RESTAURANTE         ");
    console.log("=========================================");
    console.log("  1. Registrar un producto nuevo");
    console.log("  2. Mostrar el menu completo");
    console.log("  3. Filtrar catalogo de productos");
    console.log("  4. Agregar producto al pedido actual");
    console.log("  5. Filtrar articulos de mi pedido");
    console.log("  6. Ver ticket y calculo total");
    console.log("  7. Procesar y preparar pedido (Asincrono)");
    console.log("  8. Cancelar y vaciar pedidos");
    console.log("  9. Salir de la aplicacion");
    console.log("=========================================");

    readline.question("\nSelecciona una opcion (1-9): ", (opcion) => {
        const opStr = opcion.trim();
        if (opStr === "1") {
            readline.question("Nombre del producto: ", (nombre) => {
                readline.question("Precio: ", (precio) => {
                    readline.question("Categoria (plato/bebida/postre): ", (categoria) => {
                        crearProducto(nombre, Number(precio), categoria);
                        iniciarSistema();
                    });
                });
            });
        } else if (opStr === "2") {
            mostrarMenu();
            iniciarSistema();
        } else if (opStr === "3") {
            mostrarFiltrosProductos();
            iniciarSistema();
        } else if (opStr === "4") {
            readline.question("ID del producto a agregar: ", (id) => {
                agregarPedido(Number(id));
                iniciarSistema();
            });
        } else if (opStr === "5") {
            readline.question("Categoria a filtrar (plato/bebida/postre): ", (cat) => {
                mostrarFiltrosPedidos(cat);
                iniciarSistema();
            });
        } else if (opStr === "6") {
            mostrarTicket();
            iniciarSistema();
        } else if (opStr === "7") {
            if (listaPedidos.length === 0) {
                console.log("\n[ERROR] No puedes preparar un pedido vacio. Agrega productos primero.");
                iniciarSistema();
            } else {
                console.log("\n=========================================");
                console.log("        SELECCION DE SIMULACION          ");
                console.log("=========================================");
                console.log("  1. Preparar cafe (Exito)");
                console.log("  2. Error en cocina (Falla)");
                console.log("  3. Falta ingrediente (Falla)");
                console.log("=========================================");
                readline.question("\nSelecciona escenario (1-3): ", (simOp) => {
                    const op = Number(simOp);
                    if (op === 1 || op === 2 || op === 3) {
                        actualizarEstadoPedido(op);
                    } else {
                        console.log("\n[ERROR] Escenario no valido. Volviendo al menu.");
                        iniciarSistema();
                    }
                });
            }
        } else if (opStr === "8") {
            listaPedidos = [];
            console.log("\n[EXITO] La lista de pedidos se ha vaciado por completo.");
            iniciarSistema();
        } else if (opStr === "9") {
            console.log("\nGracias por usar el sistema. ¡Hasta luego!\n");
            readline.close();
        } else {
            console.log("\n[ERROR] Opcion no valida. Intenta de nuevo.");
            iniciarSistema();
        }
    });
}

crearProducto("Tacos de asada", 60, "plato");
crearProducto("Refresco", 25, "bebida");
crearProducto("Agua de horchata", 20, "bebida");
crearProducto("Flan napolitano", 40, "postre");
crearProducto("Corte Ribeye", 250, "plato");

iniciarSistema();
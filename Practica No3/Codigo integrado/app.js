const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const catalogo = [];
let listaPedidos = [];

function crearProducto(id, nombre, precio, categoria) {
    catalogo.push({ id, nombre, precio, categoria });
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
    const producto = buscarProducto(idProducto);
    if (producto) {
        listaPedidos.push(producto);
        return true;
    }
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

function mostrarMenu() {
    console.log("\n--- MENU DEL DIA ---");
    if (catalogo.length === 0) {
        console.log("El catalogo esta vacio.");
    } else {
        const menuForm = catalogo.map(p => `[${p.id}] ${p.nombre} (${p.categoria}) -> $${p.precio}`);
        menuForm.forEach(item => console.log(item));
    }
}

function mostrarFiltrosProductos() {
    console.log("\n--- FILTRAR PRODUCTOS ---");
    
    console.log("Productos Baratos (<= $50):");
    const baratos = obtenerProductosBaratos(50);
    baratos.forEach(p => console.log(` - ${p.nombre}: $${p.precio}`));

    console.log("\nProductos Caros (>= $100):");
    const caros = obtenerProductosCaros(100);
    caros.forEach(p => console.log(` - ${p.nombre}: $${p.precio}`));

    console.log("\nBebidas:");
    const bebidas = obtenerPorCategoria("bebida");
    bebidas.forEach(p => console.log(` - ${p.nombre}: $${p.precio}`));
    
    console.log("\nPostres:");
    const postres = obtenerPorCategoria("postre");
    postres.forEach(p => console.log(` - ${p.nombre}: $${p.precio}`));
}

function mostrarFiltrosPedidos(categoria) {
    console.log(`\n--- PEDIDOS FILTRADOS POR: ${categoria.toUpperCase()} ---`);
    const filtrados = filtrarPedidosPorCategoria(categoria);
    if (filtrados.length === 0) {
        console.log("No hay pedidos de esta categoria.");
    } else {
        filtrados.forEach(p => console.log(` * ${p.nombre} -> $${p.precio}`));
        const subtotal = filtrados.reduce((acum, { precio }) => acum + precio, 0);
        const iva = subtotal * 0.16;
        const total = subtotal + iva;
        console.log(`Subtotal Categoria: $${subtotal.toFixed(2)}`);
        console.log(`IVA Categoria: $${iva.toFixed(2)}`);
        console.log(`Total Categoria: $${total.toFixed(2)}`);
    }
}

function mostrarTicket() {
    console.log("\n--- TICKET DE COMPRA ---");
    if (listaPedidos.length === 0) {
        console.log("No hay pedidos registrados.");
    } else {
        listaPedidos.forEach(({ nombre, precio }) => {
            console.log(` * ${nombre} -> $${precio}`);
        });
        
        const { subtotal, iva, total } = calcularTotal();
        console.log("------------------------");
        console.log(`SUBTOTAL: $${subtotal.toFixed(2)}`);
        console.log(`IVA (16%): $${iva.toFixed(2)}`);
        console.log(`TOTAL: $${total.toFixed(2)}`);
    }
}

function iniciarSistema() {
    console.log("\n1. Crear producto nuevo");
    console.log("2. Mostrar menu completo");
    console.log("3. Filtrar productos");
    console.log("4. Crear nuevo pedido (Agregar)");
    console.log("5. Filtrar pedidos actuales");
    console.log("6. Ver ticket y calculo total");
    console.log("7. Vaciar pedidos");
    console.log("8. Salir");

    readline.question("\nElige una opcion: ", (opcion) => {
        if (opcion === "1") {
            readline.question("ID (numero): ", (id) => {
                readline.question("Nombre: ", (nombre) => {
                    readline.question("Precio: ", (precio) => {
                        readline.question("Categoria (plato/bebida/postre): ", (categoria) => {
                            crearProducto(Number(id), nombre, Number(precio), categoria);
                            console.log("Producto creado.");
                            iniciarSistema();
                        });
                    });
                });
            });
        } else if (opcion === "2") {
            mostrarMenu();
            iniciarSistema();
        } else if (opcion === "3") {
            mostrarFiltrosProductos();
            iniciarSistema();
        } else if (opcion === "4") {
            readline.question("ID del producto a agregar: ", (id) => {
                const agregado = agregarPedido(Number(id));
                if (agregado) {
                    console.log("Producto agregado al pedido.");
                } else {
                    console.log("ID no encontrado.");
                }
                iniciarSistema();
            });
        } else if (opcion === "5") {
            readline.question("Categoria a filtrar en tus pedidos (plato/bebida/postre): ", (cat) => {
                mostrarFiltrosPedidos(cat);
                iniciarSistema();
            });
        } else if (opcion === "6") {
            mostrarTicket();
            iniciarSistema();
        } else if (opcion === "7") {
            listaPedidos = [];
            console.log("Lista de pedidos vaciada.");
            iniciarSistema();
        } else if (opcion === "8") {
            readline.close();
        } else {
            console.log("Opcion invalida.");
            iniciarSistema();
        }
    });
}

crearProducto(1, "Tacos de asada", 60, "plato");
crearProducto(2, "Refresco", 25, "bebida");
crearProducto(3, "Agua de horchata", 20, "bebida");
crearProducto(4, "Flan napolitano", 40, "postre");
crearProducto(5, "Corte Ribeye", 250, "plato");

iniciarSistema();

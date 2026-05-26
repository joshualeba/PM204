function actualizarEstadoPedido(opcionSimulacion) {
    console.log("\n[Cliente] Pedido recibido");
    setTimeout(() => {
        console.log("[Cliente] Preparando.........");
        setTimeout(() => {
            console.log("[Cliente] Empacando.........");
            setTimeout(() => {
                prepararPedido(opcionSimulacion)
                    .then((resultado) => {
                        console.log("[Cliente] Pedido Entregado");
                        procesarNotificacionCaja("pedido listo", resultado, (mensaje) => {
                            console.log(`[Caja] ${mensaje}`);
                            iniciarSistema();
                        });
                    })
                    .catch((error) => {
                        console.log("[Cliente] Pedido Cancelado");
                        procesarNotificacionCaja("pedido cancelado", error, (mensaje) => {
                            console.log(`[Caja] ${mensaje}`);
                            iniciarSistema();
                        });
                    });
            }, 1000);
        }, 1000);
    }, 1000);
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
    const catLimpia = categoria.trim().toLowerCase();
    if (catLimpia !== "plato" && catLimpia !== "bebida" && catLimpia !== "postre") {
        console.log("Error: Categoria de filtro no valida.");
        return;
    }
    console.log(`\n--- PEDIDOS FILTRADOS POR: ${catLimpia.toUpperCase()} ---`);
    const filtrados = filtrarPedidosPorCategoria(catLimpia);
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
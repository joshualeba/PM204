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
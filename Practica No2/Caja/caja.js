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
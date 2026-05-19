function buscarProducto(catalogo, idProducto) {
    return catalogo.find(producto => producto.id === idProducto);
}

function obtenerProductosBaratos(catalogo, precioMaximo) {
    return catalogo.filter(producto => producto.precio <= precioMaximo);
}

function obtenerProductosCaros(catalogo, precioMinimo) {
    return catalogo.filter(producto => producto.precio >= precioMinimo);
}

function obtenerPorCategoria(catalogo, categoriaBuscada) {
    return catalogo.filter(producto => producto.categoria.toLowerCase() === categoriaBuscada.toLowerCase());
}

module.exports = {
    buscarProducto,
    obtenerProductosBaratos,
    obtenerProductosCaros,
    obtenerPorCategoria
};

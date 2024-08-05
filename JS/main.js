let transacciones = [];
let totalIngresos = 0;
let totalGastos = 0;
let balance = 0;

document.getElementById('formulario-transaccion').addEventListener('submit', function (evento) {
    evento.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const descripcion = document.getElementById('descripcion').value;

    agregarTransaccion(tipo, monto, descripcion);
    mostrarTransacciones();
    actualizarPantalla();
});

function agregarTransaccion(tipo, monto, descripcion) {
    const transaccion = {
        id: Date.now(),
        tipo: tipo,
        monto: monto,
        descripcion: descripcion,
        fecha: new Date()
    };

    transacciones.push(transaccion);
    actualizarTotales();
}

function actualizarTotales() {
    totalIngresos = transacciones
        .filter(transaccion => transaccion.tipo === 'ingreso')
        .reduce((acum, transaccion) => acum + transaccion.monto, 0);

    totalGastos = transacciones
        .filter(transaccion => transaccion.tipo === 'gasto')
        .reduce((acum, transaccion) => acum + transaccion.monto, 0);

    balance = totalIngresos - totalGastos;
}

function mostrarTransacciones() {
    const listaTransacciones = document.getElementById('lista-transacciones');
    listaTransacciones.innerHTML = '';
    transacciones.forEach(transaccion => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaccion.tipo}: $${transaccion.monto} - ${transaccion.descripcion} (${transaccion.fecha.toLocaleString()})`;
        listaTransacciones.appendChild(listItem);
    });
}

function actualizarPantalla() {
    document.getElementById('balance').textContent = balance.toFixed(2);
    document.getElementById('total-ingresos').textContent = totalIngresos.toFixed(2);
    document.getElementById('total-gastos').textContent = totalGastos.toFixed(2);
}


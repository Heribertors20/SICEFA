var compras = [];

// Declarar varable de indice seleccionado
var indice;

var sucursal;
var direccion;
var empleado;
var time;

// Funcion de inicio
export function añadirCampos(){

    sucursal = document.getElementById("txt_sucursal");
    direccion = document.getElementById("txt_direccion");
    empleado = document.getElementById("txt_empleado");
    time = document.getElementById("txt_time");
    // Cargar datos desde el archivo JSON
    fetch("../api/restcompra/getall")
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            compras = jsondata;
            // Cargar tabla
            loadTable();
        }
    );
}

function cleanInputs(){
    sucursal.value = "";
    direccion.value = "";
    empleado.value = "";
    time.value = "";
    document.getElementById("tblProducto").innerHTML = "";
}

// Funcion para cargar la tabla
function loadTable(){
    // variable donde almacenara el codigo html
    let html = "";
    // Recorrer todas las compras
    compras.forEach(function(compra){
        // Crear la variable registro
        let registro = 
        "<tr class='row-data' onclick='controller.selectCompra(" + compras.indexOf(compra) + ")'>" + 
        "<td>" + compra.idCompra +
        "</td><td>" + compra.empleado.persona.nombre + " " + compra.empleado.persona.apellidoPaterno + " " + compra.empleado.persona.apellidoMaterno +
        "</td><td>" + compra.empleado.sucursal.nombre +
        "</td></tr>";
        // Sumar la variable registro al codigo html
        html += registro;
    });
    // Insertar el codigo html dentro de la tabla Sucursal
    document.getElementById("tblCompra").innerHTML = html;
}

export function selectCompra(index){

    sucursal.value = compras[index].empleado.sucursal.nombre;
    direccion.value = compras[index].empleado.sucursal.ciudad + ', ' + compras[index].empleado.sucursal.estado + ' - ' + compras[index].empleado.sucursal.codigoPostal;
    empleado.value = compras[index].empleado.persona.nombre + " " + compras[index].empleado.persona.apellidoPaterno + " " + compras[index].empleado.persona.apellidoMaterno;
    time.value = compras[index].fechaHoraPedido;

    let html = "";
    compras[index].productos.forEach(function(p){
        let registro = 
        "<tr><td style='border-right: 1px black solid;'>" + p.producto.nombre +
        "</td><td style='border-right: 1px black solid;'>" + p.cantidad +
        "</td><td>" + p.precioCompra +
        "</td></tr>";
        
        html += registro;
    });

    document.getElementById("tblProducto").innerHTML = html;

    indice = index;

    showModalEdit();
}
export function atenderPedido(){

    fetch("../api/restcompra/atender?idC=" + compras[indice].idCompra)
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            compras.splice(indice, 1);
            indice = null;
            // Cargar Tabla
            loadTable();
            searchCompra();
            // Borrar texto del los inputs
            cleanInputs();

            toastr["success"]("Pedido Atendido Correctamente", "Operacion Exitosa");
            closeModal();
        }
    ); 
}
export function searchCompra(){
    // Traer texto a buscar en minusculas para que la busqueda se indistinta de mayusculas o minuculas
    let textToSeach = document.querySelector("input[type='search']").value.toLowerCase();
    // Encontrar todas las filas que se encuentran en el tbody
    let tbody = document.getElementById("tblCompra");
    let rows = tbody.getElementsByTagName("tr");

    // Recorrer cada una de las filas
    for (let i = 0; i < rows.length; i++) {
        // Ocultar la fila con una propiedad CSS
        rows[i].style.display = "none"
        // Obtener todos los td dentro de esa fila
        let celdas = rows[i].getElementsByTagName("td");

        // Recorrer cada tb de la fila
        for (let j = 0; j < celdas.length; j++){

            // Obtener el texto del td en minusculas para que la busqueda se indistinta de mayusculas o minuculas
            let text = celdas[j].textContent.toLowerCase();

            // Verificar si la palabra buscada esta dentro del texto
            if (text.indexOf(textToSeach) > -1){
                // Mostrar la fila
                rows[i].style.display = "table-row"
                // Romper el ciclo
                break;
            }
        }   
    }
}
export function showModalEdit(){
    console.log(buttons);

    const modal = document.querySelector(".left");
    if (modal) {
        modal.style.visibility = "visible";
    }
}
function closeModal(){
    const modal = document.querySelector(".left");
    if (modal) {
        modal.style.visibility = "hidden";
    }
}
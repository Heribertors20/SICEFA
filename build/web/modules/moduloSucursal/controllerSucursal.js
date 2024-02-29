
// Declara arreglo de sucursales
var sucursales = [];

// Declarar varable de indece seleccionado
var indiceSucursalSeleccionada;

// Declara variables globales de los inputs
var nombreSucursal;
var nombreTitular;
var rfcTitular;
var domicilio;
var colonia;
var ciudad;
var estado;
var codigoPostal;
var telefono;
var longitud;
var latitud;
var estatus;

function validateFields(){

    const formatText = (cadena) => {
        cadena = cadena.trim()
        cadena = cadena.replace(/[^a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ\d.#]/g, '')
        cadena = cadena.replace(/_/g, '')
        cadena = cadena.replace(/-/g, '')
        cadena = cadena.charAt(0).toUpperCase() + cadena.slice(1)
        
        return cadena;
    }

    if (nombreSucursal.value === "")  throw new Error('Falta el nombre de la sucursal') 
    if (nombreTitular.value === "")  throw new Error('Falta el nombre del titular')
    if (rfcTitular.value === "")  throw new Error('Falta el RFC del titular')
    if (domicilio.value === "")  throw new Error('Falta el domicilio')
    if (colonia.value === "")  throw new Error('Falta el nombre de la colonia')
    if (ciudad.value === "")  throw new Error('Falta el nombre del la ciudad')
    if (estado.value === "")  throw new Error('Falta el nombre del estado')
    if (codigoPostal.value === "")  throw new Error('Falta el codigo postal')
    if (telefono.value === "")  throw new Error('Falta el telefono')
    if (longitud.value === "")  throw new Error('Falta la logitud de la ubicación')
    if (latitud.value === "")  throw new Error('Falta la latitud de la ubicación')

    nombreSucursal.value = formatText(nombreSucursal.value)
    nombreTitular.value = formatText(nombreTitular.value)
    domicilio.value = formatText(domicilio.value)
    colonia.value = formatText(colonia.value)
    ciudad.value = formatText(ciudad.value)
    rfcTitular.value = rfcTitular.value.toUpperCase()
    
    let regex
    regex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ]+$/
    if (!regex.test(nombreTitular.value)) throw new Error('El nombre del titular es incorrecto')
    regex = /^\d{5}$/
    if (!regex.test(codigoPostal.value)) throw new Error('El código postal es incorrecto')
    regex = /^(-)?\d+(\.\d{1,10})?$/
    if (!regex.test(longitud.value)) throw new Error('La longitud puede tener hasta 10 decimales')
    if (!regex.test(latitud.value)) throw new Error('La latitud puede tener hasta 10 decimales')
    regex = /^\d{10}$/
    if (!regex.test(telefono.value)) throw new Error('El número telefonico es incorrecto')
    regex = /^[a-zA-Z0-9]{12,13}$/
    if (!regex.test(rfcTitular.value)) throw new Error('El RFC es incorrecto')
}

// Funcion de inicio
export function añadirCampos(){

    // Guardar los elementos del DOM que se van a utilizar en varables globales
    nombreSucursal = document.getElementById("nombre-sucursal");
    nombreTitular = document.getElementById("nombre-titular");
    rfcTitular = document.getElementById("rfc-titular");
    domicilio = document.getElementById("domicilio");
    colonia = document.getElementById("colonia");
    ciudad = document.getElementById("ciudad");
    estado = document.getElementById("estado");
    codigoPostal = document.getElementById("codigo-postal");
    telefono = document.getElementById("telefono");
    longitud = document.getElementById("longitud");
    latitud = document.getElementById("latitud");
    estatus = document.getElementById("estatus");

    // Limpiar los inputs, por si tenian algo antes
    cleanInputs();

    // Cargar datos desde la bd
    fetch("../api/restsucursal/getall")
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            sucursales = jsondata;
            // Cargar tabla
            loadTable();
        }
    );
}

// Funcion para añadir una sucursal
export function addSucursal(){
    try {
        validateFields()
    } catch (error) {
        toastr["error"](error.message, 'Ha ocurrido un error')
        return
    }    
    // Recuperar datos de los inputs y asignarlos a su valor correspondiente
    let sucursal = {
        "idSucursal": sucursales.length + 1,
        "telefono": telefono.value,
        "nombre": nombreSucursal.value,
        "titular": nombreTitular.value,
        "rfc": rfcTitular.value,
        "estatus": 1,
        "latitud": latitud.value,
        "longitud": longitud.value,
        "codigoPostal": codigoPostal.value,
        "estado": estado.value,
        "ciudad": ciudad.value,
        "colonia": colonia.value,
        "domicilio": domicilio.value
    };

    // Añadir sucursal a la BD
    const params = {s: JSON.stringify(sucursal)};
    
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(params)
    };
    
    fetch("../api/restsucursal/insert", options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        // Añadir sucursal al arreglo
        sucursales.push(sucursal);
        // Cargar Tabla
        loadTable();
        // Aplicar filtro de busqueda
        searchSucursal();
        // Borrar texto del los inputs
        cleanInputs();
        toastr["success"]("Sucursal agregada correctamente", "Operacion Exitosa");
        // Estableser el indice seleccionado en nulo,
        // Por si tenia algun valor
        indiceSucursalSeleccionada = null;
        closeModal();
    });
}

// Funcion para seleccion una sucursal
export function selectSucursal(index){
    // Recuperar la sucursal seleccionada mediante su indice
    let sucursal = sucursales[index]

    // Asignar los valores de la sucursal a los inputs
    nombreSucursal.value = sucursal.nombre;
    nombreTitular.value = sucursal.titular;
    rfcTitular.value = sucursal.rfc;
    domicilio.value = sucursal.domicilio;
    colonia.value = sucursal.colonia;
    ciudad.value = sucursal.ciudad;
    estado.value = sucursal.estado;
    codigoPostal.value = sucursal.codigoPostal;
    telefono.value = sucursal.telefono;
    longitud.value = sucursal.longitud;
    latitud.value = sucursal.latitud;
    
    let deleteButton = document.getElementById("deleteButton");
    if (sucursal.estatus === 1){
        let html = '<i class="fa-solid fa-circle-minus"></i> <span>Eliminar</span>'
        estatus.value = "Activo";
        deleteButton.onclick = controller.deleteSucursal;
        deleteButton.innerHTML = html;
    } else {
        let html = '<i class="fa-solid fa-circle-check"></i> <span>Reactivar</span>'
        estatus.value = "Inactivo";
        deleteButton.onclick = controller.reactivateSucursal;
        deleteButton.innerHTML = html;
    }

    // Modificar la variable global con el indice
    indiceSucursalSeleccionada = index;

    // Poner Mapa
    createMap(sucursal.latitud, sucursal.longitud);

    showModalEdit();
}

export function reactivateSucursal(){
    // Reactivar en la bd
    fetch("../api/restsucursal/reactivate?idS=" + sucursales[indiceSucursalSeleccionada].idSucursal)
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            // Cambiar el estatus de la sucursal seleccionada a 1
            sucursales[indiceSucursalSeleccionada].estatus = 1;
            console.log(jsondata)
            // Establecer el valor del indice seleccionado en nulo
            indiceSucursalSeleccionada = null;
            // Cargar Tabla
            loadTable();
            // Aplicar filtro de busqueda
            searchSucursal();
            // Borrar texto del los inputs
            cleanInputs();
            let deleteButton = document.getElementById("deleteButton");
            let html = '<i class="fa-solid fa-circle"></i> <span>-</span>';
            deleteButton.onclick = null;
            deleteButton.innerHTML = html;
            toastr["success"]("Sucursal reactivada correctamente", "Operacion Exitosa");
            closeModal();
        }
    ); 
}

// Funcion para eliminar una sucurssal
export function deleteSucursal(){
    // Eliminar en la bd
    fetch("../api/restsucursal/delete?idS=" + sucursales[indiceSucursalSeleccionada].idSucursal)
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            // Cambiar el estatus de la sucursal seleccionada a 0
            sucursales[indiceSucursalSeleccionada].estatus = 0;
            console.log(jsondata)
            // Establecer el valor del indice seleccionado en nulo
            indiceSucursalSeleccionada = null;
            // Cargar Tabla
            loadTable();
            // Aplicar filtro de busqueda
            searchSucursal();
            // Borrar texto del los inputs
            cleanInputs();
            let deleteButton = document.getElementById("deleteButton");
            let html = '<i class="fa-solid fa-circle"></i> <span>-</span>';
            deleteButton.onclick = null;
            deleteButton.innerHTML = html;
            toastr["info"]("Sucursal eliminada correctamente", "Operacion Exitosa");
            closeModal();
        }
    );    
}

export function editSucursal(){
    try {
        validateFields()
    } catch (error) {
        toastr["error"](error.message, 'Ha ocurrido un error')
        return
    }   
    // Codigo para evitar que se ingreseen datos sin valor
    let inputs = document.querySelectorAll(".row input");
    for (let i = 0; i < (inputs.length - 1); i++){      
        console.log(inputs[i])  
        if (inputs[i].value === ""){
            // Finaliza la funcion
            toastr["error"]("Faltan datos por introducir o alguno es incorrecto", "No fue posible modificar")
            return;
        }
    } 
    // Recuperar datos de los inputs y asignarlos a su valor correspondiente
    let sucursal = {
        "idSucursal": sucursales[indiceSucursalSeleccionada].idSucursal,
        "telefono": telefono.value,
        "nombre": nombreSucursal.value,
        "titular": nombreTitular.value,
        "rfc": rfcTitular.value,
        "estatus": sucursales[indiceSucursalSeleccionada].estatus,
        "latitud": latitud.value,
        "longitud": longitud.value,
        "codigoPostal": codigoPostal.value,
        "estado": estado.value,
        "ciudad": ciudad.value,
        "colonia": colonia.value,
        "domicilio": domicilio.value
    };

    // Añadir sucursal a la BD
    const params = {s: JSON.stringify(sucursal)};
    
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(params)
    };
    
    fetch("../api/restsucursal/edit", options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        // Añadir sucursal al arreglo
        sucursales[indiceSucursalSeleccionada] = sucursal;
        // Cargar Tabla
        loadTable();
        // Aplicar filtro de busqueda
        searchSucursal();
        // Borrar texto del los inputs
        cleanInputs();
        toastr["success"]("Sucursal modificada correctamente", "Operacion Exitosa");
        // Estableser el indice seleccionado en nulo,
        // Por si tenia algun valor
        indiceSucursalSeleccionada = null;
        closeModal();
    });
}


export function searchSucursal(){
    // Traer texto a buscar en minusculas para que la busqueda se indistinta de mayusculas o minuculas
    let textToSeach = document.querySelector("input[type='search']").value.toLowerCase();
    // Encontrar todas las filas que se encuentran en el tbody "tblSucursal"
    let tbody = document.getElementById("tblSucursal");
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

// Funcion para limpiar los inputs
function cleanInputs(){
    // Poner en todos los inputs cadenas vacias
    nombreSucursal.value = "";
    nombreTitular.value = "";
    rfcTitular.value = "";
    domicilio.value = "";
    colonia.value = "";
    ciudad.value = "";
    estado.value = "";
    codigoPostal.value = "";
    telefono.value = "";
    longitud.value = "";
    latitud.value = "";
    estatus.value = "";
    // Borrar mapa anterior
    document.getElementById('mapContainer').innerHTML = "";
    if (window.innerWidth <= 800){
        document.getElementById('mapContainer').style.display = 'none';
    }
    
}

// Funcion para cargar la tabla
export function loadTable(){
    // variable donde almacenare el codigo html
    let html = "";
    // Recorrer todas las sucursales
    sucursales.forEach(function(sucursal){
        
        // Añadir la sucursal al codigo unicamente si se cumplen por lo menos una de estas dos condiciones
        // 1- Que el checkbox tenga un valor "True"
        // 2- Que el estatus de la sucursal sea 1 o activo
        if (document.getElementById("mostrar-inactivos").checked || sucursal.estatus === 1){
            // Crear la variable registro
            let registro = 
            "<tr class='row-data' onclick='controller.selectSucursal(" + sucursales.indexOf(sucursal) + ")'>" + 
            "<td>" + sucursal.nombre +
            "</td><td>" + sucursal.titular + ' - ' + sucursal.rfc +
            "</td><td>" + sucursal.domicilio + " - " + sucursal.colonia + " - " + sucursal.ciudad + " - " + sucursal.estado + " - " + sucursal.codigoPostal +
            "</td><td>" + sucursal.telefono +
            "</td></tr>";
            // Sumar la variable registro al codigo html
            html += registro;
        }
    });
    if (html === ""){
        document.getElementById("tblSucursal").innerHTML = "<tr><td></td><td></td><td></td><td></td></tr>";
    } else {
        // Insertar el codigo html dentro de la tabla Sucursal
        document.getElementById("tblSucursal").innerHTML = html;
    }

    searchSucursal();
    
}

// Funcion poara poner el mapa en las coordenadas especificas
function createMap(latitud, longitud){
    // Borrar mapa anterior
    document.getElementById('mapContainer').innerHTML = "";
    document.getElementById('mapContainer').style.display = 'block';

    // Codigo para insertar el MAPA con mi API key
    var platform = new H.service.Platform({
    apikey: 'p1T_AgFa5bwmfRkSPH1VXSfnp8yqUQBnkIPESySTZGg' 
    });

    var defaultLayers = platform.createDefaultLayers();
    var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
        center: { lat: latitud, lng: longitud },
        zoom: 16
    }
    );

    // Habilitar el comportamiento de arrastrar y mover el mapa con el mouse
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Agrega un marcador en las coordenadas dadas
    var marker = new H.map.Marker({ lat: latitud, lng: longitud });
    map.addObject(marker);
  
}

export function showModal(){
    const buttons = document.querySelectorAll("#buttons button") 

    cleanInputs();
    const modal = document.querySelector(".left");
    if (modal) {
        modal.style.visibility = "visible";
        buttons[0].disabled = false;
        buttons[1].disabled = true;
        buttons[2].disabled = true;
    }
}
export function showModalEdit(){
    const buttons = document.querySelectorAll("#buttons button");

    const modal = document.querySelector(".left");
    if (modal) {
        modal.style.visibility = "visible";
        buttons[0].disabled = true;
        buttons[1].disabled = false;
        buttons[2].disabled = false;
    }
}
function closeModal(){
    const modal = document.querySelector(".left");
    if (modal) {
        modal.style.visibility = "hidden";
    }
}
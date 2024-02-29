var productos = [];

// Funcion para añadir un campo 
export function añadirCampos(){
   
    fetch("../api/restproductosucursal/getall")
    .then(response => {
        return response.json();
    }).then(
        function(jsondata){
            productos = jsondata;
            console.log(productos)
            // Cargar tabla
            loadTable();
        }
    );
}

export function searchProducto(){
     // Traer texto a buscar en minusculas para que la busqueda se indistinta de mayusculas o minuculas
     let textToSeach = document.querySelector("input[type='search']").value.toLowerCase();
     // Encontrar todas las filas que se encuentran en el tbody
     let tbody = document.getElementById("tblProducto");
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

export function loadTable(){
    let html = "";
    productos.forEach(function(p){
        //console.log(producto.nombre)
        if (!p.sucursal.nombre || p.sucursal.nombre === getCookie("sucursal")){
            // Crear la variable registro
            let registro = 
            "<tr class='row-data'>" + 
            "<td>" + p.producto.nombre + " - " +
            p.producto.nombreGenerico + " - " +
            p.producto.formaFarmaceutica + " - " +
            p.producto.unidadMedida + " - " +
            p.producto.presentacion + " - " +
            p.producto.principalIndicacion + " - " +
            p.producto.contraindicaciones + " - " +
            p.producto.concentracion + " - " +
            p.producto.unidadesEnvase + " - " +
            p.producto.precioCompra + " - " +
            p.producto.precioVenta +
            "</td><td><img style='object-fit: contain; width:100px; height:100px;' src=" + (p.producto.foto === "" ? '../img/placeholderProduit.png' : p.producto.foto) +
            "></td><td>" + p.existencias +
            "</td></tr>";
            // Sumar la variable registro al codigo html
            html += registro;

        }
    });
    if (html === ""){
        document.getElementById("tblProducto").innerHTML = "<tr><td></td><td></td><td></td><td></td></tr>";
    } else {
        // Insertar el codigo html dentro de la tabla producto
        document.getElementById("tblProducto").innerHTML = html + "";
    }

    searchProducto();
}

function getCookie(nombre) {
    var nombreCookie = nombre + "=";
    var arrayCookies = document.cookie.split(';');
    
    for (var i = 0; i < arrayCookies.length; i++) {
        var cookie = arrayCookies[i].trim();
        
        if (cookie.indexOf(nombreCookie) === 0) {
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }
    
    return " "; // Si no se encuentra la cookie
}


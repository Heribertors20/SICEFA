var productos = [];

var indice;

var nombreProducto;
var nombreGen;
var formaFarmaceutica;
var unidadMedida;
var presentacion;
var contraInd;
var prinIndicacion;
var concentracion;
var unidadEnvase;
var precioCompra;
var precioVenta;
var estatus;
var data;
var previewImage;

// Funcion para añadir un campo 
export function añadirCampos() {

    let table = document.querySelector("table");
    //table.style.display = "block";
    //table.style.overflowY = "scroll";

    nombreProducto = document.getElementById("nombre_producto");
    formaFarmaceutica = document.getElementById("forma_farmaceutica");
    unidadMedida = document.getElementById("unidad_medida");
    presentacion = document.getElementById("presentacion");
    prinIndicacion = document.getElementById("principal_indicacion");
    concentracion = document.getElementById("concentracion");
    unidadEnvase = document.getElementById("unidades_envase");
    precioCompra = document.getElementById("precio_compra");
    precioVenta = document.getElementById("precio_venta");
    estatus = document.getElementById("estatus");
    nombreGen = document.getElementById("nombre_generico");
    contraInd = document.getElementById("contraindicaciones");
    data = document.getElementById("txtData");
    previewImage = document.getElementById("previewImage");

    fetch("../api/restproductocentral/getall")
        .then(response => {
            return response.json();
        }).then(
            function (jsondata) {
                productos = jsondata;
                // Cargar tabla
                loadTable();
            }
        );
}

// Funcion para añadir un producto
export function addProducto() {
    if (validarForm()) {
        
   
    let producto = {
        "idProducto": productos.length + 1,
        "nombre": nombreProducto.value,
        "nombreGenerico": nombreGen.value,
        "formaFarmaceutica": formaFarmaceutica.value,
        "unidadMedida": unidadMedida.value,
        "presentacion": presentacion.value,
        "principalIndicacion": prinIndicacion.value,
        "contraindicaciones": contraInd.value,
        "concentracion": concentracion.value,
        "unidadesEnvase": unidadEnvase.value,
        "precioCompra": precioCompra.value,
        "precioVenta": precioVenta.value,
        "foto": data.value,
        "rutaFoto": "",
        "codigoBarras": "",
        "estatus": 1
    };

    const params = { p: JSON.stringify(producto) };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(params)
    };

    fetch("../api/restproductocentral/insert", options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            productos.push(producto);
            loadTable();
            searchProducto();
            cleanInputs();
            toastr["success"]("Producto agregado correctamente", "Operacion Exitosa");
            indice = null;
            closeModal();
        });
    }
}

export function selectProducto(index) {
    let p = productos[index]

    nombreProducto.value = p.nombre;
    nombreGen.value = p.nombreGenerico;
    formaFarmaceutica.value = p.formaFarmaceutica;
    unidadMedida.value = p.unidadMedida;
    presentacion.value = p.presentacion;
    contraInd.value = p.contraindicaciones;
    prinIndicacion.value = p.principalIndicacion;
    concentracion.value = p.concentracion;
    unidadEnvase.value = p.unidadesEnvase;
    precioCompra.value = p.precioCompra;
    precioVenta.value = p.precioVenta;
    document.getElementById("txtFoto").value = "";

    if (p.foto === "") {
        data.value = "";
        previewImage.src = '../img/placeholderProduit.png';
    } else {
        data.value = p.foto;
        previewImage.src = p.foto;
    }


    let deleteButton = document.getElementById("deleteButton");
    if (p.estatus === 1) {
        let html = '<i class="fa-solid fa-circle-minus"></i> <span>Eliminar</span>'
        estatus.value = "Activo";
        deleteButton.onclick = controller.deleteProducto;
        deleteButton.innerHTML = html;
    } else {
        let html = '<i class="fa-solid fa-circle-check"></i> <span>Reactivar</span>'
        estatus.value = "Inactivo";
        deleteButton.onclick = controller.reactivateProducto;
        deleteButton.innerHTML = html;
    }


    indice = index;

    showModalEdit();
}

export function deleteProducto() {
    fetch("../api/restproductocentral/delete?idP=" + productos[indice].idProducto)
        .then(response => {
            return response.json();
        }).then(
            function (jsondata) {
                productos[indice].estatus = 0;
                indice = null;
                // Cargar Tabla
                loadTable();
                // Aplicar filtro de busqueda
                searchProducto();
                // Borrar texto del los inputs
                cleanInputs();

                let deleteButton = document.getElementById("deleteButton");
                let html = '<i class="fa-solid fa-circle"></i> <span>-</span>';
                deleteButton.onclick = null;
                deleteButton.innerHTML = html;
                toastr["info"]("Producto eliminado correctamente", "Operacion Exitosa");
                closeModal();
            }
        );
}
export function reactivateProducto() {

    fetch("../api/restproductocentral/reactivate?idP=" + productos[indice].idProducto)
        .then(response => {
            return response.json();
        }).then(
            function (jsondata) {
                productos[indice].estatus = 1;
                indice = null;
                // Cargar Tabla
                loadTable();
                // Aplicar filtro de busqueda
                searchProducto();
                // Borrar texto del los inputs
                cleanInputs();

                let deleteButton = document.getElementById("deleteButton");
                let html = '<i class="fa-solid fa-circle"></i> <span>-</span>';
                deleteButton.onclick = null;
                deleteButton.innerHTML = html;
                toastr["success"]("Producto reactivado correctamente", "Operacion Exitosa");
                closeModal();
            }
        );
}

export function editProducto() {
    if (validarForm()) {
    let producto = {
        "idProducto": productos[indice].idProducto,
        "nombre": nombreProducto.value,
        "nombreGenerico": nombreGen.value,
        "formaFarmaceutica": formaFarmaceutica.value,
        "unidadMedida": unidadMedida.value,
        "presentacion": presentacion.value,
        "principalIndicacion": prinIndicacion.value,
        "contraindicaciones": contraInd.value,
        "concentracion": concentracion.value,
        "unidadesEnvase": unidadEnvase.value,
        "precioCompra": precioCompra.value,
        "precioVenta": precioVenta.value,
        "foto": data.value,
        "rutaFoto": "",
        "codigoBarras": "",
        "estatus": productos[indice].estatus
    };

    const params = { p: JSON.stringify(producto) };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(params)
    };

    fetch("../api/restproductocentral/edit", options)
        .then(response => response.json())
        .then(response => {

            productos[indice] = producto;
            // Cargar Tabla
            loadTable();
            // Aplicar filtro de busqueda
            searchProducto();
            // Borrar texto del los inputs
            cleanInputs();
            toastr["success"]("Producto modificado correctamente", "Operacion Exitosa");
            // Estableser el indice seleccionado en nulo,
            // Por si tenia algun valor
            indice = null;
            closeModal();
        });
    }
}

export function searchProducto() {
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
        for (let j = 0; j < celdas.length; j++) {

            // Obtener el texto del td en minusculas para que la busqueda se indistinta de mayusculas o minuculas
            let text = celdas[j].textContent.toLowerCase();

            // Verificar si la palabra buscada esta dentro del texto
            if (text.indexOf(textToSeach) > -1) {
                // Mostrar la fila
                rows[i].style.display = "table-row"
                // Romper el ciclo
                break;
            }
        }
    }
}


function cleanInputs() {

    nombreProducto.value = "";
    nombreGen.value = "";
    formaFarmaceutica.value = "";
    unidadMedida.value = "";
    presentacion.value = "";
    contraInd.value = "";
    prinIndicacion.value = "";
    concentracion.value = "";
    unidadEnvase.value = "";
    precioCompra.value = "";
    precioVenta.value = "";
    estatus.value = "";
    previewImage.src = "../img/placeholderProduit.png";
    data.value = "";
}

export function loadTable() {
    let html = "";
    productos.forEach(function (producto) {
        //console.log(producto.nombre)
        if (document.getElementById("mostrar_inactivos").checked || producto.estatus === 1) {
            // Crear la variable registro
            let registro =
                "<tr class='row-data' onclick='controller.selectProducto(" + productos.indexOf(producto) + ")'>" +
                "<td>" + producto.nombre +
                "</td><td>" + producto.nombreGenerico +
                "</td><td>" + producto.formaFarmaceutica +
                "</td></tr>";
            // Sumar la variable registro al codigo html
            html += registro;

        }
    });
    if (html === "") {
        document.getElementById("tblProducto").innerHTML = "<tr><td></td><td></td><td></td><td></td></tr>";
    } else {
        // Insertar el codigo html dentro de la tabla producto
        document.getElementById("tblProducto").innerHTML = html + "";
    }

    searchProducto();
}
export function loadImage() {
    let inputImage = document.getElementById("txtFoto");
    if (inputImage.files && inputImage.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let fotoB64 = e.target.result;
            document.getElementById("previewImage").src = fotoB64;
            document.getElementById("txtData").value = fotoB64;
        };

        reader.readAsDataURL(inputImage.files[0]);
    }
}
export function showModal() {
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
export function showModalEdit() {
    const buttons = document.querySelectorAll("#buttons button");
    console.log(buttons);

    const modal = document.querySelector(".left");
    if (modal) {
        modal.style.visibility = "visible";
        buttons[0].disabled = true;
        buttons[1].disabled = false;
        buttons[2].disabled = false;
    }
}
function closeModal() {
    const modal = document.querySelector(".left");
    if (modal) {
        modal.style.visibility = "hidden";
    }
}

function validarForm() {
    const nombreValue = nombreProducto.value.trim();
    const nombreGenValue = nombreGen.value.trim();
    const formaFarmValue = formaFarmaceutica.value.trim();
    const unidadMedValue = unidadMedida.value.trim();
    const presentacionValue = presentacion.value.trim();
    const contIndValue = contraInd.value.trim();
    const prinIndValue = prinIndicacion.value.trim();
    const consValue = concentracion.value.trim();
    const uniEnvaValue = unidadEnvase.value.trim();
    const precioCompraValue = precioCompra.value.trim();
    const precioVentaValue = precioVenta.value.trim();
    const dataValue = data.value.trim();
    
    if (!nombreValue ||
        !nombreGenValue ||
        !formaFarmValue ||
        !unidadMedValue ||
        !presentacionValue ||
        !contIndValue ||
        !prinIndValue ||
        !consValue ||
        !uniEnvaValue ||
        !precioCompraValue ||
        !precioVentaValue ||
        !dataValue) {
        toastr.error('Todos los campos son obligatorios.');
        return false;
    }

    const namePattern = /^[a-zA-ZÀ-ÿ\s]+$/;
    const noNumberPattern = /^[^\d]+$/;
    const pricePattern = /^\d+$/;

    if (!validarCampo(nombreValue, namePattern, "El nombre del producto no debe contener caracteres especiales, números o espacios.")) {
        return false;
    }

    if (!validarCampo(formaFarmValue, noNumberPattern, "La forma farmacéutica no debe contener caracteres especiales.")) {
        return false;
    }

    if (!validarCampo(unidadMedValue, noNumberPattern, "La unidad de medida no debe contener números.")) {
        return false;
    }

    if (!validarCampo(prinIndValue, noNumberPattern, "La indicación principal no debe contener números.")) {
        return false;
    }

    if (!validarCampo(uniEnvaValue, /^[^\W_]+$/, "La unidad en envase no debe contener caracteres especiales.")) {
        return false;
    }

    const notNullPattern = /.+/;
    if (!notNullPattern.test(presentacionValue)) {
        toastr.error("La presentación es obligatoria.");
        return false;
    }

    if (!notNullPattern.test(dataValue)) {
        toastr.error("La foto del producto es obligatoria.");
        return false;
    }

    if (!pricePattern.test(precioCompraValue) || !pricePattern.test(precioVentaValue)) {
        toastr.error("Los precios de compra y venta deben ser valores numéricos.");
        return false;
    }

    if (!validarCampo(contIndValue, noNumberPattern, "Las contraindicaciones no deben contener números.")) {
        return false;
    }

    if (!notNullPattern.test(consValue)) {
        toastr.error("La concentración es obligatoria.");
        return false;
    }

    return true;
}


function validarCampo(campo, pattern, mensaje) {
    let resultado = pattern.test(campo);
    if  (!resultado) {
        toastr.error(mensaje);
    }
    return resultado
} 9
var clientes = [];

var fecha_de_registro;
var nombre;
var a_paterno;
var a_materno;
var genero;
var fecha_nacimiento;
var rfc;
var curp;
var domicilio;
var codigo_postal;
var ciudad;
var estado;
var telefono;
var email;
var indice;
var data;
var previewImage;

// Función para obtener los datos de clientes
export function añadirCampos() {
  nombre = document.getElementById("nombre");
  a_paterno = document.getElementById("apellido_Paterno");
  a_materno = document.getElementById("apellido_Materno");
  genero = document.getElementById("genero");
  fecha_nacimiento = document.getElementById("fecha_nacimiento");
  rfc = document.getElementById("rfc");
  curp = document.getElementById("curp");
  domicilio = document.getElementById("domicilio");
  codigo_postal = document.getElementById("codigo-postal");
  ciudad = document.getElementById("ciudad");
  estado = document.getElementById("estado");
  telefono = document.getElementById("telefono");
  fecha_de_registro = document.getElementById("fecha_de_registro");
  email = document.getElementById("email");
  data = document.getElementById("txtData");
  previewImage = document.getElementById("previewImage");

  fetch("../api/restcliente/getall")
    .then(response => {
      return response.json();
    }).then(
      function (jsondata) {
        clientes = jsondata;
        loadTable();
      }
    );
}


// Función para cargar la tabla con los datos de clientes
export function loadTable() {

  let html = "";
  clientes.forEach(function (cliente) {
    if (document.getElementById("mostrar-inactivos").checked || cliente.estatus == 1) {
      let registro =
        "<tr class='row-data table-success' onclick='controller.selectCliente(" + clientes.indexOf(cliente) + ")'>" +
        "<td>" + cliente.persona.nombre + " " + cliente.persona.apellidoPaterno + " " + cliente.persona.apellidoMaterno +
        "</td><td>" + cliente.persona.domicilio + ", " + cliente.persona.ciudad + " " + cliente.persona.codigoPostal +
        "</td><td>" + cliente.email +
        "</td></tr>";
      html += registro;
    }
  });
  document.getElementById("tblClientes").innerHTML = html;
  searchCliente();
}

export function addCliente() {
  if (validarFormulario()) {
    let cliente = {
      "idCliente": 0,
      "email": email.value,
      "fechaRegistro": "",
      "estatus": 0,
      "persona": {
        "idPersona": 0,
        "nombre": nombre.value,
        "apellidoPaterno": a_paterno.value,
        "apellidoMaterno": a_materno.value,
        "genero": genero.value,
        "fechaNacimiento": parseDate(fecha_nacimiento.value),
        "rfc": rfc.value,
        "curp": curp.value,
        "domicilio": domicilio.value,
        "codigoPostal": codigo_postal.value,
        "ciudad": ciudad.value,
        "estado": estado.value,
        "telefono": telefono.value,
        "foto": data.value
      }
    };

    const params = { c: JSON.stringify(cliente) };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams(params)
    };

    fetch("../api/restcliente/insert", options)
      .then(response => response.json())
      .then(response => {
        añadirCampos();
        cleanInputs();
        toastr["success"]("Cliente agregado correctamente", "Operacion Exitosa");
        indice = null;
        closeModal();
      });
  }
}

export function selectCliente(index) {
  let cliente = clientes[index];

  fecha_de_registro.value = cliente.fechaRegistro;
  nombre.value = cliente.persona.nombre;
  a_paterno.value = cliente.persona.apellidoPaterno;
  a_materno.value = cliente.persona.apellidoMaterno;
  genero.value = cliente.persona.genero;
  fecha_nacimiento.value = cliente.persona.fechaNacimiento;
  rfc.value = cliente.persona.rfc;
  curp.value = cliente.persona.curp;
  domicilio.value = cliente.persona.domicilio;
  codigo_postal.value = cliente.persona.codigoPostal;
  ciudad.value = cliente.persona.ciudad;
  estado.value = cliente.persona.estado;
  telefono.value = cliente.persona.telefono;
  email.value = cliente.email;

  if (cliente.persona.foto === "") {
    data.value = "";
    previewImage.src = '../img/placeholderPerson.png';
  } else {
    data.value = cliente.persona.foto;
    previewImage.src = cliente.persona.foto;
  }


  let deleteButton = document.getElementById("deleteButton");
  if (cliente.estatus === 1) {
    let html = '<i class="fa-solid fa-circle-minus"></i> <span>Eliminar</span>';
    deleteButton.onclick = controller.deleteCliente;
    deleteButton.innerHTML = html;
  } else {
    let html = '<i class="fa-solid fa-circle-check"></i> <span>Reactivar</span>';
    deleteButton.onclick = controller.reactivateCliente;
    deleteButton.innerHTML = html;
  }

  indice = index;

  showModalEdit();
}

export function editCliente() {
  if (validarFormulario()) {
    let cliente = {
      "idCliente": clientes[indice].idCliente,
      "email": email.value,
      "fechaRegistro": parseDate(fecha_de_registro.value),
      "estatus": clientes[indice].estatus,
      "persona": {
        "idPersona": clientes[indice].persona.idPersona,
        "nombre": nombre.value,
        "apellidoPaterno": a_paterno.value,
        "apellidoMaterno": a_materno.value,
        "genero": genero.value,
        "fechaNacimiento": parseDate(fecha_nacimiento.value),
        "rfc": rfc.value,
        "curp": curp.value,
        "domicilio": domicilio.value,
        "codigoPostal": codigo_postal.value,
        "ciudad": ciudad.value,
        "estado": estado.value,
        "telefono": telefono.value,
        "foto": data.value
      }
    };

    const params = { c: JSON.stringify(cliente) };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams(params)
    };

    fetch("../api/restcliente/edit", options)
      .then(response => response.json())
      .then(response => {

        clientes[indice] = cliente;

        clientes[indice].fechaRegistro = fecha_de_registro.value;
        clientes[indice].persona.fechaNacimiento = fecha_nacimiento.value;

        loadTable();

        searchCliente();

        cleanInputs();
        toastr["success"]("Cliente modificado correctamente", "Operacion Exitosa");
        indice = null;
        closeModal();
      });
  }
}


function cleanInputs() {
  fecha_de_registro.value = "";
  nombre.value = "";
  a_paterno.value = "";
  a_materno.value = "";
  genero.value = "";
  fecha_nacimiento.value = "";
  rfc.value = "";
  curp.value = "";
  domicilio.value = "";
  codigo_postal.value = "";
  ciudad.value = "";
  estado.value = "";
  telefono.value = "";
  email.value = "";
  previewImage.src = "../img/placeholderPerson.png";
  data.value = "";
  document.getElementById("txtFoto").value = "";

}

export function deleteCliente() {
  fetch("../api/restcliente/delete?idC=" + clientes[indice].idCliente)
    .then(response => {
      return response.json();
    }).then(
      function (jsondata) {
        clientes[indice].estatus = 0;
        indice = null;
        // Cargar Tabla
        loadTable();
        // Aplicar filtro de busqueda
        searchCliente();
        // Borrar texto del los inputs
        cleanInputs();

        let deleteButton = document.getElementById("deleteButton");
        let html = '<i class="fa-solid fa-circle"></i> <span>-</span>';
        deleteButton.onclick = null;
        deleteButton.innerHTML = html;
        toastr["info"]("Cliente eliminado correctamente", "Operacion Exitosa");
        closeModal();
      }
    );
}
export function reactivateCliente() {
  fetch("../api/restcliente/reactivate?idC=" + clientes[indice].idCliente)
    .then(response => {
      return response.json();
    }).then(
      function (jsondata) {
        clientes[indice].estatus = 1;
        indice = null;
        // Cargar Tabla
        loadTable();
        // Aplicar filtro de busqueda
        searchCliente();
        // Borrar texto del los inputs
        cleanInputs();

        let deleteButton = document.getElementById("deleteButton");
        let html = '<i class="fa-solid fa-circle"></i> <span>-</span>';
        deleteButton.onclick = null;
        deleteButton.innerHTML = html;
        toastr["success"]("Cliente reactivado correctamente", "Operacion Exitosa");
        closeModal();
      }
    );
}

function parseDate(date) {
  let newDate = "";
  newDate += date.substring(8, 10);
  newDate += "/";
  newDate += date.substring(5, 7);
  newDate += "/";
  newDate += date.substring(0, 4);

  return newDate;
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
export function searchCliente() {
  // Traer texto a buscar en minusculas para que la busqueda se indistinta de mayusculas o minuculas
  let textToSeach = document.querySelector("input[type='search']").value.toLowerCase();
  // Encontrar todas las filas que se encuentran en el tbody
  let tbody = document.getElementById("tblClientes");
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
export function showModal() {
  const buttons = document.querySelectorAll("#buttons button");
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

function validarFormulario() {

  let nombreValue = nombre.value.trim();
  let apellidoPaternoValue = a_paterno.value.trim();
  let apellidoMaternoValue = a_materno.value.trim();
  const generoValue = genero.value.trim();
  const nacimientoValue = fecha_nacimiento.value.trim();
  let rfcValue = rfc.value.trim();
  let curpValue = curp.value.trim();
  const domicilioValue = domicilio.value.trim();
  const codigoPostalValue = codigo_postal.value.trim();
  const ciudadValue = ciudad.value.trim();
  const estadoValue = estado.value.trim();
  const telefonoValue = telefono.value.trim();
  const emailValue = email.value.trim();
  const dataValue = data.value.trim();



  if (!/^[a-zA-Z\s]+$/.test(nombreValue)) {
    toastr.error('El nombre solo puede contener letras y espacios.');

    return false;
  }
  nombreValue = nombreValue.charAt(0).toUpperCase() + nombreValue.slice(1);
  nombre.value = nombreValue.replace(/\b\w/g, c => c.toUpperCase());

  if (!/^[a-zA-Z]+$/.test(apellidoPaternoValue)) {
    toastr.error('El apellido paterno debe contener solo letras.');

    return false;
  }
  apellidoPaternoValue = apellidoPaternoValue.charAt(0).toUpperCase() + apellidoPaternoValue.slice(1);
  a_paterno.value = apellidoPaternoValue

  if (!/^[a-zA-Z]+$/.test(apellidoMaternoValue)) {
    toastr.error('El apellido materno debe contener solo letras.');

    return false;
  }
  apellidoMaternoValue = apellidoMaternoValue.charAt(0).toUpperCase() + apellidoMaternoValue.slice(1);
  a_materno.value = apellidoMaternoValue

  if (generoValue === '') {
    toastr.error('Debe seleccionar un género.');

    return false;
  }

  if (!nacimientoValue) {
    toastr.error('Debe ingresar una fecha de nacimiento.');

    return false;
  }
  const fechaNacimiento = new Date(nacimientoValue);
  const fechaActual = new Date();
  const diferenciaAnios = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  if (diferenciaAnios < 18) {
    toastr.error('La fecha de nacimiento debe ser hace al menos 18 años.');

    return false;
  }

  if (!/^[a-zA-Z0-9]{12,13}$/.test(rfcValue)) {
    toastr.error('El RFC debe contener entre 12 y 13 caracteres alfanuméricos.');
    return false;
  }
  rfc.value = rfcValue.toUpperCase()

  if (!/^[a-zA-Z0-9]{18}$/.test(curpValue)) {
    toastr.error('El CURP debe contener exactamente 18 caracteres alfanuméricos.');

    return false;
  }
  curp.value = curpValue.toUpperCase()

  if (!domicilioValue) {
    toastr.error("El campo domicilio no puede ser nulo");
    return false;
  }

  if (!validarCampo(codigoPostalValue, /^\d{5}$/)) {
    toastr.error('El código postal debe tener 5 dígitos numéricos.');

    return false;
  }

  if (!ciudadValue) {
    toastr.error("El campo ciudad no puede ser nulo");
    return false;
  }

  if (!estadoValue) {
    toastr.error("El campo estado no puede ser nulo");
    return false;
  }

  if (!validarCampo(telefonoValue, /^\d{10}$/)) {
    toastr.error('El teléfono debe contener exactamente 10 dígitos numéricos.');

    return false;
  }
  if (!validarCampo(emailValue, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    toastr.error('El correo electrónico no tiene un formato válido.');

    return false;
  }

  if (!validarCampo(dataValue, /.+/)) {
    toastr.error('La foto es obligatoria.');

    return false;
  }


  if (!nombreValue ||
    !apellidoPaternoValue ||
    !apellidoMaternoValue ||
    !generoValue ||
    !nacimientoValue ||
    !rfcValue ||
    !curpValue ||
    !domicilioValue ||
    !codigoPostalValue ||
    !ciudadValue ||
    !estadoValue ||
    !telefonoValue ||
    !emailValue ||
    !dataValue) {
    toastr.error('Todos los campos son obligatorios.');

    return false;
  }
  return true;
}

function validarCampo(campo, dato) {
  return dato.test(campo);
} 
let empleados = [];
let indiceEmpleadoSeleccionado;
let nombre;
let a_paterno;
let a_materno;
let genero;
let fecha_nacimiento;
let rfc;
let curp;
let domicilio;
let codigo_postal;
let ciudad;
let estado;
let telefono;
let fecha_ingreso;
let puesto;
let salario;
let email;
let codigo;
let nombreUsuario;
let contrasenia;
let rol;
let activo;
let data;
let previewImage;

export function añadirCampos() {
    nombre = document.getElementById("nombre");
    a_paterno = document.getElementById("a_paterno");
    a_materno = document.getElementById("a_materno");
    genero = document.getElementById("genero");
    fecha_nacimiento = document.getElementById("fecha_nacimiento");
    rfc = document.getElementById("rfc");
    curp = document.getElementById("curp");
    domicilio = document.getElementById("domicilio");
    codigo_postal = document.getElementById("codigo-postal");
    ciudad = document.getElementById("ciudad");
    estado = document.getElementById("estado");
    telefono = document.getElementById("telefono");
    fecha_ingreso = document.getElementById("fecha_ingreso");
    puesto = document.getElementById("puesto");
    salario = document.getElementById("salario");
    email = document.getElementById("email");
    codigo = document.getElementById("codigo");
    nombreUsuario = document.getElementById("nombreUsuario");
    contrasenia = document.getElementById("contrasenia");
    rol = document.getElementById("rol");
    activo = document.getElementById("activo");
    data = document.getElementById("txtData");
    previewImage = document.getElementById("previewImage");

    cleanInputs();

    fetch("../api/restempleado/getall")
        .then(response => {
            return response.json();
        }).then(
            function (jsondata) {
                empleados = jsondata;
                loadTable();
            }
        );
}

export function addEmpleado() {
    if (validarCampos()) {
        let empleado = {
            "puesto": puesto.value,
            "email": email.value,
            "salarioBruto": salario.value,
            "persona": {
                "nombre": nombre.value,
                "apellidoPaterno": a_paterno.value,
                "apellidoMaterno": a_materno.value,
                "genero": genero.value,
                "fechaNacimiento": parseDate(fecha_nacimiento.value),
                "rfc": rfc.value.toUpperCase(),
                "curp": curp.value.toUpperCase(),
                "domicilio": domicilio.value,
                "codigoPostal": codigo_postal.value,
                "ciudad": ciudad.value,
                "estado": estado.value,
                "telefono": telefono.value,
                "foto": data.value
            },
            "usuario": {
                "nombreUsuario": nombreUsuario.value,
                "contrasenia": contrasenia.value,
                "rol": rol.value
            },
            "sucursal": {
                "nombre": getCookie("sucursal")
            }
        };

        const params = { e: JSON.stringify(empleado) };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams(params)
        };

        fetch("../api/restempleado/insert", options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                empleados.push(empleado);
                añadirCampos();
                searchEmpleado();
                cleanInputs();
                if (response.error) {
                    toastr["error"]("Empleado no agregado correctamente", "Operación Fallida");
                } else {
                    toastr["success"]("Empleado agregado correctamente", "Operación Exitosa");
                }
                indiceEmpleadoSeleccionado = null;
                closeModal();
            });
    } else {
        toastr['error']('No se pudo crear el nuevo empleado', 'Error')
    }
}

export function selectEmpleado(index) {
    let empleado = empleados[index]

    nombre.value = empleado.persona.nombre;
    a_paterno.value = empleado.persona.apellidoPaterno;
    a_materno.value = empleado.persona.apellidoMaterno;
    genero.value = empleado.persona.genero;
    fecha_nacimiento.value = empleado.persona.fechaNacimiento;
    puesto.value = empleado.puesto;
    salario.value = empleado.salarioBruto;
    rfc.value = empleado.persona.rfc;
    curp.value = empleado.persona.curp;
    telefono.value = empleado.persona.telefono;
    fecha_ingreso.value = empleado.fechaIngreso;
    estado.value = empleado.persona.estado;
    ciudad.value = empleado.persona.ciudad;
    codigo_postal.value = empleado.persona.codigoPostal;
    domicilio.value = empleado.persona.domicilio;
    email.value = empleado.email;
    codigo.value = empleado.codigo;
    nombreUsuario.value = empleado.usuario.nombreUsuario;
    contrasenia.value = empleado.usuario.contrasenia;
    rol.value = empleado.usuario.rol;

    if (empleado.persona.foto === "") {
        data.value = "";
        previewImage.src = '../img/placeholderPerson.png';
    } else {
        data.value = empleado.persona.foto;
        previewImage.src = empleado.persona.foto;
    }

    let deleteButton = document.getElementById("deleteButton");
    if (empleado.activo === 1) {
        let html = '<i class="fa-solid fa-circle-minus"></i> <span>Eliminar</span>'
        activo.value = "Activo";
        deleteButton.onclick = controller.deleteEmpleado;
        deleteButton.innerHTML = html;
    } else {
        let html = '<i class="fa-solid fa-circle-check"></i> <span>Reactivar</span>'
        activo.value = "Inactivo";
        deleteButton.onclick = controller.reactivateEmpleado;
        deleteButton.innerHTML = html;
    }

    indiceEmpleadoSeleccionado = index;
    showModalEdit();
}

export function reactivateEmpleado() {
    fetch("../api/restempleado/reactivate?idE=" + empleados[indiceEmpleadoSeleccionado].idEmpleado)
        .then(response => {
            return response.json();
        }).then(
            function (jsondata) {
                empleados[indiceEmpleadoSeleccionado].activo = 1;
                console.log(jsondata)
                indiceEmpleadoSeleccionado = null;
                loadTable();
                searchEmpleado();
                cleanInputs();
                let deleteButton = document.getElementById("deleteButton");
                let html = '<i class="fa-solid fa-circle"></i> <span>-</span>';
                deleteButton.onclick = null;
                deleteButton.innerHTML = html;
                toastr["success"]("Empleado reactivado correctamente", "Operación Exitosa");
                closeModal();
            }
        );
}

export function deleteEmpleado() {
    fetch("../api/restempleado/delete?idE=" + empleados[indiceEmpleadoSeleccionado].idEmpleado)
        .then(response => {
            return response.json();
        }).then(
            function (jsondata) {
                empleados[indiceEmpleadoSeleccionado].activo = 0;
                console.log(jsondata)
                indiceEmpleadoSeleccionado = null;
                loadTable();
                searchEmpleado();
                cleanInputs();
                let deleteButton = document.getElementById("deleteButton");
                let html = '<i class="fa-solid fa-circle"></i> <span>-</span>';
                deleteButton.onclick = null;
                deleteButton.innerHTML = html;
                toastr["info"]("Empleado eliminado correctamente", "Operación Exitosa");
                closeModal();
            }
        );
}

export function editEmpleado() {
    if (validarCampos()) {
        let empleado = {
            "idEmpleado": empleados[indiceEmpleadoSeleccionado].idEmpleado,
            "codigo": empleados[indiceEmpleadoSeleccionado].codigo,
            "fechaIngreso": parseDate(fecha_ingreso.value),
            "puesto": puesto.value,
            "email": email.value,
            "salarioBruto": salario.value,
            "activo": empleados[indiceEmpleadoSeleccionado].activo,
            "persona": {
                "idPersona": empleados[indiceEmpleadoSeleccionado].persona.idPersona,
                "nombre": nombre.value,
                "apellidoPaterno": a_paterno.value,
                "apellidoMaterno": a_materno.value,
                "genero": genero.value,
                "fechaNacimiento": parseDate(fecha_nacimiento.value),
                "rfc": rfc.value.toUpperCase(),
                "curp": curp.value.toUpperCase(),
                "domicilio": domicilio.value,
                "codigoPostal": codigo_postal.value,
                "ciudad": ciudad.value,
                "estado": estado.value,
                "telefono": telefono.value,
                "foto": data.value
            },
            "usuario": {
                "idUsuario": empleados[indiceEmpleadoSeleccionado].usuario.idUsuario,
                "nombreUsuario": nombreUsuario.value,
                "contrasenia": contrasenia.value,
                "rol": rol.value
            },
            "sucursal": {
                "nombre": getCookie("sucursal")
            }
        };

        const params = { e: JSON.stringify(empleado) };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams(params)
        };

        fetch("../api/restempleado/edit", options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                empleados[indiceEmpleadoSeleccionado] = empleado;
                loadTable();
                searchEmpleado();
                empleados[indiceEmpleadoSeleccionado].persona.fechaNacimiento = fecha_nacimiento.value;
                empleados[indiceEmpleadoSeleccionado].fechaIngreso = fecha_ingreso.value;
                cleanInputs();
                toastr["success"]("Empleado modificado correctamente", "Operación Exitosa");
                indiceEmpleadoSeleccionado = null;
                closeModal();
            });
    }
}


function cleanInputs() {
    nombre.value = "";
    a_paterno.value = "";
    a_materno.value = "";
    genero.value = "";
    fecha_nacimiento.value = "";
    rfc.value = "";
    curp.value = "";
    telefono.value = "";
    estado.value = "";
    ciudad.value = "";
    codigo_postal.value = "";
    domicilio.value = "";
    fecha_ingreso.value = "";
    puesto.value = "";
    salario.value = "";
    email.value = "";
    codigo.value = "";
    nombreUsuario.value = "";
    contrasenia.value = "";
    rol.value = "";
    activo.value = "";
    data.value = "";
    previewImage.src = "../img/placeholderPerson.png";
}

export function searchEmpleado() {
    let textToSeach = document.querySelector("input[type='search']").value.toLowerCase();
    let tbody = document.getElementById("tblEmpleado");
    let rows = tbody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = "none"
        let celdas = rows[i].getElementsByTagName("td");

        for (let j = 0; j < celdas.length; j++) {
            let text = celdas[j].textContent.toLowerCase();

            if (text.indexOf(textToSeach) > -1) {
                rows[i].style.display = "table-row"
                break;
            }
        }
    }
}

export function loadTable() {
    let html = "";
    empleados.forEach(function (empleado) {
        if ((document.getElementById("mostrar-inactivos").checked || empleado.activo === 1) && empleado.sucursal.nombre === getCookie('sucursal')) {
            let registro =
                "<tr class='row-data' onclick='controller.selectEmpleado(" + empleados.indexOf(empleado) + ")'>" +
                "<td>" + empleado.codigo +
                "</td><td>" + empleado.persona.nombre + " " + empleado.persona.apellidoPaterno + " " + empleado.persona.apellidoMaterno +
                "</td><td>" + empleado.puesto +
                "</td><td>" + empleado.salarioBruto +
                "</td></tr>";
            html += registro;
        }
    });
    if (html === "") {
        document.getElementById("tblEmpleado").innerHTML = "<tr><td></td><td></td><td></td><td></td></tr>";
    } else {
        document.getElementById("tblEmpleado").innerHTML = html;
    }
    searchEmpleado();
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

function validarCampos() {

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
    const puestoValue = puesto.value.trim();
    const salarioValue = salario.value.trim();
    const emailValue = email.value.trim();
    const rolValue = rol.value.trim();
    const dataValue = data.value.trim();

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
        !puestoValue ||
        !salarioValue ||
        !emailValue ||
        !rolValue ||
        !dataValue) {
        toastr.error('Todos los campos son obligatorios.');

        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(nombreValue.charAt(0).toUpperCase() + nombreValue.slice(1))) {
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
    
    if (!/^\d+(\.\d{1,2})?$/.test(salarioValue)) {
        toastr.error('El salario debe ser un valor numérico, opcionalmente con hasta dos decimales.');

        return false;
    }

    if (!validarCampo(emailValue, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        toastr.error('El correo electrónico no tiene un formato válido.');

        return false;
    }

    if (!validarCampo(codigoPostalValue, /^\d{5}$/)) {
        toastr.error('El código postal debe tener 5 dígitos numéricos.');

        return false;
    }

    if (!validarCampo(telefonoValue, /^\d{10}$/)) {
        toastr.error('El teléfono debe contener exactamente 10 dígitos numéricos.');

        return false;
    }

    if (!validarCampo(dataValue, /.+/)) {
        toastr.error('La foto es obligatoria.');

        return false;
    }



    return true;
}

function validarCampo(campo, dato) {
    return dato.test(campo);
} 
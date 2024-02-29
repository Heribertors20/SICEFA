export function validarCampos(){
    if (!validarNombre(nombre.value)) {
        return false;
    }

    if (!validarApellidos(a_paterno.value, a_materno.value)) {
        return false;
    }

    if (!validarCodigoPostal(codigo_postal.value)) {
        return false;
    }

    if (!validarTelefono(telefono.value)) {
        return false;
    }

    if (!validarEmail(email.value)) {
        return false;
    }

    if (!validarContrasenia(contrasenia.value)) {
        return false;
    }

    return true;
}


function validarNombre(nombre) {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/.test(nombre)) {
        toastr.warning('El nombre solo puede contener letras y espacios', 'Advertencia');
        document.getElementById("nombre").focus();
        return false;
    }
    return true;
}

function validarApellidos(apellidoPaterno, apellidoMaterno) {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/.test(apellidoPaterno) || !/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/.test(apellidoMaterno)) {
        toastr.warning('Los apellidos solo pueden contener letras y espacios', 'Advertencia');
        document.getElementById("a_paterno").focus();
        return false;
    }
    return true;
}

function validarCodigoPostal(codigoPostal) {
    if (!/^\d{5}$/.test(codigoPostal)) {
        toastr.warning('El código postal debe contener exactamente 5 números', 'Advertencia');
        document.getElementById("codigo-postal").focus();
        return false;
    }
    return true;
}

function validarTelefono(telefono) {
    if (!/^\d{10}$/.test(telefono)) {
        toastr.warning('El teléfono debe contener exactamente 10 números', 'Advertencia');
        document.getElementById("telefono").focus();
        return false;
    }
    return true;
}

function validarEmail(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toastr.warning('Ingrese un correo electrónico válido', 'Advertencia');
        document.getElementById("email").focus();
        return false;
    }
    return true;
}

function validarContrasenia(contrasenia) {
    if (!/^[A-Za-z]{5,10}$/.test(contrasenia) || !/[A-Z]/.test(contrasenia)) {
        toastr.warning('La contraseña debe tener entre 5 y 10 caracteres y al menos una letra mayúscula', 'Advertencia');
        document.getElementById("contrasenia").focus();
        return false;
    }
    return true;
}
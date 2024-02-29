export function añadirNombre(){
  document.getElementById("user-name").innerText = getCookie("empleado");
}

export function cambiarPassword(){
  let confirmacion = window.confirm("¿Estás seguro de que deseas cambiar la contraseña?");
  let newPassword = document.getElementById("password-text").value;

  if (confirmacion) {
    let usuario = {
        "nombreUsuario":getCookie("nombreUsuario"),
        "contrasenia":newPassword
    };
    
    const params = {u: JSON.stringify(usuario)};
    
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(params)
    };
    fetch("../api/restlogin/changepassword", options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            toastr["success"]("Contraseña cambiada con exito", "Exito");
        });
  } else {
    toastr["error"]("Cambio de contraseña cancelado", "Operacion cancelada");
  }
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
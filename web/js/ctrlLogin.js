
let nombreUsuario;
let contraseña;

function login(){
    nombreUsuario = document.getElementById("usuario").value;
    contrasenia = document.getElementById("contrasenia").value;
    
    let usuario = {
        "nombreUsuario":nombreUsuario,
        "contrasenia":contrasenia
    };
    
    const params = {u: JSON.stringify(usuario)};
    
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(params)
    };
    fetch("../api/restlogin/login", options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if (response.success){
                //localStorage.setIten('token', response.token);
                setCookie("nombreUsuario", nombreUsuario);
                setCookie("contrasenia", contrasenia);
                setCookie("rol", response.rol);
                setCookie("sucursal", response.sucursal);
                setCookie("empleado", response.empleado);
                setCookie("codigo", response.codigo);
                if (response.rol === "ADMC"){
                    window.location.href = "./sicefaCentral.html";
                } else {
                    window.location.href = "./sicefaSucursal.html";
                }
            } else if (response.error){
                toastr["error"]("Credenciales Invalidas", "Error")
            }
        });
    
}

function setCookie(nombre, valor) {
    var fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (1 * 24 * 60 * 60 * 1000));
    var cadenaCookie = nombre + "=" + valor + "; expires=" + fechaExpiracion.toUTCString() + "; path=/";
    document.cookie = cadenaCookie;
}

contrasenia = document.getElementById("contrasenia");

contrasenia.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      login();
    }
});
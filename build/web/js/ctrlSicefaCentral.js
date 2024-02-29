var main = document.getElementById("miMain");
var active = "home";
var controller;

function home() {
    let html = `
    <div class="contenedor">
        <div class="inferior">
            <img src="../img/logo.webp" alt="">
        </div>
        <div class="superior">
            Bienvenido a Sicefa Central
        </div>
    </div>`;
    changeActive("home");
    main.innerHTML = html;
}

function sucursal() {
    fetch("../modules/moduloSucursal/vistaSucursal.html")
    .then( 
        function (response) {return response.text()}
    )
    .then(
        function (html) {
            changeActive("sucursal");
            main.innerHTML = html;
            import("../modules/moduloSucursal/controllerSucursal.js").then((module) => {
                controller = module
                controller.añadirCampos();
            });
        }
    );
}

function sobreNosotros() {

    window.location.href = "sobreNosotros.html";
}

function producto() {
    fetch("../modules/moduloProductoCentral/vistaProducto.html")
    .then( 
        function (response) {return response.text()}
    )
    .then(
        function (html) {
            changeActive("producto");
            main.innerHTML = html;
            import("../modules/moduloProductoCentral/controllerProducto.js").then((module) => {
                controller = module;
                controller.añadirCampos();
            });
        }
    );
}

function pedido() {
    fetch("../modules/moduloCompra/vistaCompra.html")
    .then( 
        function (response) {return response.text()}
    )
    .then(
        function (html) {
            changeActive("pedido");
            main.innerHTML = html;
            import("../modules/moduloCompra/controllerCompra.js").then((module) => {
                controller = module;
                controller.añadirCampos();
            });
        }
    );
}

function cambiarPassword(){
    fetch("../modules/moduloUsuario/vistaUsuario.html")
    .then( 
        function (response) {return response.text()}
    )
    .then(
        function (html) {
            changeActive("settings");
            main.innerHTML = html;
            import("../modules/moduloUsuario/controllerUsuario.js").then((module) => {
                controller = module;
                controller.añadirNombre();
            });
        }
    );
}

function changeActive(element) {
    let icon;
    icon = document.getElementById(active);
    icon.classList.remove("active");
    icon = document.getElementById(element);
    icon.classList.add("active");
    active = element;
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

function checkLogin(){
    let usuario = {
        "nombreUsuario":getCookie("nombreUsuario"),
        "contrasenia":getCookie("contrasenia")
    };
    
    document.getElementById("information").innerText = getCookie('empleado') + ' - ' + getCookie('codigo');
    
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
            if (response.error){
                window.location.href = "..";
            } else if (response.success){
                toastr["success"]("Inicio de sesión exitoso", "Bienvenido");
            }
        })
        .catch(error => {
            window.location.href = "..";
        });


}
function closeModal(){
    const modal = document.querySelector(".left");
    console.log(modal)
    if (modal) {
        modal.style.visibility = "hidden";
    }
}

checkLogin();
DROP DATABASE IF EXISTS sicefa;
CREATE DATABASE sicefa;
USE sicefa ;

-- -----------------------------------------------------
-- Table persona
-- -----------------------------------------------------
CREATE TABLE persona 
(
  idPersona         INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre            VARCHAR(45) NOT NULL,
  apellidoPaterno   VARCHAR(45) NOT NULL,
  apellidoMaterno   VARCHAR(45) NOT NULL DEFAULT '',
  genero            VARCHAR(2)  NOT NULL DEFAULT 'O', -- H: Hombre; M: Mujer; O: Otro
  fechaNacimiento   DATE NOT NULL,
  rfc               VARCHAR(15) NOT NULL DEFAULT '',
  curp              VARCHAR(19) NOT NULL DEFAULT '',
  domicilio         VARCHAR(129) NOT NULL DEFAULT '',
  codigoPostal      VARCHAR(11) NOT NULL DEFAULT '',
  ciudad            VARCHAR(46) NOT NULL DEFAULT '',
  estado            VARCHAR(40) NOT NULL DEFAULT '',
  telefono          VARCHAR(20) NOT NULL DEFAULT '',
  foto              LONGTEXT NOT NULL
);

-- -----------------------------------------------------
-- Table usuario
-- -----------------------------------------------------
CREATE TABLE usuario 
(
  idUsuario         INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombreUsuario     VARCHAR(33) UNIQUE NOT NULL,
  contrasenia       VARCHAR(16) NOT NULL,
  rol               VARCHAR(10) NOT NULL    -- ADMC: Administrador del Sistema Central
                                            -- ADMS: Administrador de Sucursal
                                            -- EMPS: Empleado de Sucursal
);

-- -----------------------------------------------------
-- Table sucursal
-- -----------------------------------------------------
CREATE TABLE sucursal 
(
  idSucursal    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre        VARCHAR(49) NOT NULL,
  titular       VARCHAR(49) NOT NULL DEFAULT '',
  rfc           VARCHAR(15) NOT NULL  DEFAULT '', -- RFC del titular
  domicilio     VARCHAR(129) NOT NULL DEFAULT '',
  colonia       VARCHAR(65) NOT NULL DEFAULT '',
  codigoPostal  VARCHAR(11) NOT NULL DEFAULT '',
  ciudad        VARCHAR(65) NOT NULL DEFAULT '',
  estado        VARCHAR(49) NOT NULL DEFAULT '',
  telefono      VARCHAR(20) NOT NULL DEFAULT '',
  latitud       VARCHAR(65) NOT NULL DEFAULT '0.0',
  longitud      VARCHAR(65) NOT NULL DEFAULT '0.0',
  estatus       INT NOT NULL DEFAULT 1 -- 0: Inactivo; 1: Activo
);

-- -----------------------------------------------------
-- Table empleado
-- -----------------------------------------------------
CREATE TABLE empleado 
(
  idEmpleado    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  codigo        VARCHAR(10) UNIQUE NOT NULL,
  fechaIngreso  DATE NOT NULL,
  puesto        VARCHAR(45) NOT NULL,
  salarioBruto  FLOAT NOT NULL,
  activo        INT NOT NULL DEFAULT 1,
  idPersona     INT NOT NULL,
  idUsuario     INT NOT NULL,
  idSucursal    INT NOT NULL,
  email         VARCHAR(65),    
  CONSTRAINT fk_idPersona_empleado
    FOREIGN KEY (idPersona)
    REFERENCES persona (idPersona)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_idUsuario_empleado
    FOREIGN KEY (idUsuario)
    REFERENCES usuario (idUsuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_idSucursal_empleado
    FOREIGN KEY (idSucursal)
    REFERENCES sucursal (idSucursal)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table cliente
-- -----------------------------------------------------
CREATE TABLE cliente 
(
  idCliente     INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email         VARCHAR(45) NOT NULL DEFAULT '',
  fechaRegistro DATE NOT NULL,
  estatus       INT NOT NULL DEFAULT 1, -- 0: Inactivo; 1: Activo
  idPersona     INT NOT NULL,
  CONSTRAINT fk_idpersona_cliente
    FOREIGN KEY (idPersona)
    REFERENCES persona (idPersona)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table producto
-- -----------------------------------------------------
CREATE TABLE producto 
(
  idProducto        INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre            VARCHAR(180) NOT NULL DEFAULT '',
  nombreGenerico    VARCHAR(200) NOT NULL,
  formaFarmaceutica VARCHAR(100) NOT NULL,
  unidadMedida      VARCHAR(25) NOT NULL DEFAULT '',
  presentacion      VARCHAR(200) NOT NULL,
  principalIndicacion VARCHAR(255) NOT NULL DEFAULT '',
  contraindicaciones VARCHAR(255) NOT NULL DEFAULT '',
  concentracion     VARCHAR(255) NOT NULL,
  unidadesEnvase    INT NOT NULL DEFAULT 1,
  precioCompra      FLOAT NOT NULL DEFAULT 0.0,
  precioVenta       FLOAT NOT NULL DEFAULT 0.0,
  foto              LONGTEXT NOT NULL,
  rutaFoto          VARCHAR(254) NOT NULL DEFAULT '',
  codigoBarras      VARCHAR(65)  NOT NULL DEFAULT '',
  estatus           INT NOT NULL DEFAULT 1 -- 0: Inactivo; 1: Activo;
);

-- -----------------------------------------------------
-- Las Existencias de los Productos estan en funcion
-- de cada sucursal. Por eso esta tabla es necesaria.
-- -----------------------------------------------------
CREATE TABLE inventario 
(
  idInventario  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  idProducto    INT NOT NULL,
  idSucursal    INT NOT NULL,
  existencias   INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_idProducto_inventario
    FOREIGN KEY (idProducto)
    REFERENCES producto (idProducto)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_idSucursal_inventario
    FOREIGN KEY (idSucursal)
    REFERENCES sucursal (idSucursal)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table venta
-- -----------------------------------------------------
CREATE TABLE venta 
(
  idVenta       INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fechaHora     DATETIME NOT NULL,
  estatus       INT NOT NULL DEFAULT 1, -- 0: Cancelada o Eliminada; 
                                        -- 1: Realizada; 
                                        -- 2: Pendiente;
  idCliente     INT NOT NULL,
  idEmpleado    INT NOT NULL,
  CONSTRAINT fk_idEmpleado_venta
    FOREIGN KEY (idEmpleado)
    REFERENCES empleado (idEmpleado)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_idCliente_venta
    FOREIGN KEY (idCliente)
    REFERENCES cliente (idCliente)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table detalleVenta
-- -----------------------------------------------------
CREATE TABLE detalleVenta 
(
  idProducto    INT NOT NULL,
  idVenta       INT NOT NULL,
  cantidad      INT NOT NULL,
  precioVenta   FLOAT NOT NULL,
  CONSTRAINT fk_idProducto_dv
    FOREIGN KEY (idProducto)
    REFERENCES producto (idProducto)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_idVenta_dv
    FOREIGN KEY (idVenta)
    REFERENCES venta (idVenta)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

-- -----------------------------------------------------
-- Table compra
-- -----------------------------------------------------
CREATE TABLE compra 
(
  idCompra          INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fechaHoraPedido   DATETIME NOT NULL,
  estatus           INT NOT NULL, -- 0: La compra fue CANCELADA o ELIMINADA de forma logica; 
                                  -- 1: La compra esta PENDIENTE de ser surtida; 
                                  -- 2: La compra fue ATENDIDA y
                                  --    por consiguiente, se agregaron
                                  --    las cantidades al inventario correspondiente;
  activo            INT NOT NULL DEFAULT 1,
  idEmpleado        INT NOT NULL,
  CONSTRAINT fk_idEmpleado_compra
    FOREIGN KEY (idEmpleado)
    REFERENCES empleado (idEmpleado)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table detalleCompra
-- -----------------------------------------------------
CREATE TABLE detalleCompra
(
  idCompra      INT NOT NULL,
  idProducto    INT NOT NULL,
  cantidad      INT NOT NULL,
  precioCompra  FLOAT NOT NULL,
  CONSTRAINT fk_idPedido_detalleC
    FOREIGN KEY (idCompra)
    REFERENCES compra (idCompra)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_idProducto_detalleP
    FOREIGN KEY (idProducto)
    REFERENCES producto (idProducto)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

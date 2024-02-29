USE sicefa;

-- Procedimiento Almacenado para generar el codigo de un nuevo empleado.
DROP PROCEDURE IF EXISTS generarCodigoEmpleado;
DELIMITER $$
CREATE PROCEDURE generarCodigoEmpleado(OUT codigo VARCHAR(8))
	BEGIN
		DECLARE anio INT;
		DECLARE mes VARCHAR(2);
		DECLARE num VARCHAR(4);
		SET anio  = RIGHT(year(now()),2);
		SET mes   = LPAD(RIGHT(month(now()),2), 2, '0');
		SET num   = (SELECT LPAD(MAX(idUsuario) + 1, 4, '0') FROM usuario);
		SET codigo= CONCAT(anio,mes,num);
	END
$$
DELIMITER ;

-- Procedimiento almacenado para insertar un nuevo Empleado.
DROP PROCEDURE IF EXISTS insertarEmpleado;
DELIMITER $$
CREATE PROCEDURE insertarEmpleado(/* Datos Personales */
                                    IN	var_nombre          VARCHAR(64),    --  1
                                    IN	var_apellidoPaterno VARCHAR(64),    --  2
                                    IN	var_apellidoMaterno VARCHAR(64),    --  3
                                    IN  var_genero          VARCHAR(2),     --  4
                                    IN  var_fechaNacimiento VARCHAR(11),    --  5
                                    IN  var_rfc             VARCHAR(14),    --  6
                                    IN  var_curp            VARCHAR(19),    --  7
                                    IN	var_domicilio       VARCHAR(129),   --  8
                                    IN  var_cp              VARCHAR(11),    --  9
                                    IN  var_ciudad          VARCHAR(46),    -- 10
                                    IN  var_estado          VARCHAR(40),    -- 11
                                    IN	var_telefono        VARCHAR(20),    -- 12
                                    IN	var_foto            LONGTEXT,       -- 13
                                    
                                  /* Datos del la Sucursal */
                                    IN  var_Sucursal      VARCHAR(49),      -- 14
                                    
                                  /* Datos del Usuario    */
                                    IN  var_rol             VARCHAR(10),    -- 15
                                    
                                  /* Datos del Empleado */  
                                    IN  var_puesto          VARCHAR(25),    -- 16
                                    IN  var_salarioBruto    FLOAT,          -- 17
                                    
                                  /* Nuevos datos */
                                    IN var_nombreUsuario VARCHAR(45),       -- 18
                                    IN var_contrasenia VARCHAR(45),         -- 19
                                    IN var_email VARCHAR(65),               -- 20
                                  
                                  /* Parametros de Salida */
                                    OUT var_idPersona       INT,            -- 21
                                    OUT var_idUsuario       INT,            -- 22
                                    OUT var_idEmpleado      INT,            -- 23
                                    OUT var_codigoEmpleado  VARCHAR(9)      -- 24
                                    
                                    
                                 )
    BEGIN
        Declare var_idSucursal int;
        SET var_idSucursal = (select idSucursal from sucursal where nombre = var_Sucursal);
        -- Comenzamos insertando los datos de la Persona:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( var_nombre, var_apellidoPaterno, var_apellidoMaterno, 
                            var_genero, STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
                            var_rfc, var_curp, var_domicilio, var_cp,
                            var_ciudad, var_estado, var_telefono, var_foto);
        
        -- Obtenemos el ID de Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID(); 
        
        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);
        
        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_codigoEmpleado, var_codigoEmpleado, var_rol);
        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID(); 
        
        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal, email)
                    VALUES(var_codigoEmpleado, NOW(), var_puesto, var_salarioBruto,
                           1, var_idPersona, var_idUsuario, var_idSucursal, var_email);
                           
       SET var_idEmpleado = LAST_INSERT_ID(); 
    END
$$
DELIMITER ;

-- Procedimiento almacenado para editar un Empleado.
DROP PROCEDURE IF EXISTS editarEmpleado;
DELIMITER $$
CREATE PROCEDURE editarEmpleado(/* Datos Personales */
                                    IN	var_nombre          VARCHAR(64),    --  1
                                    IN	var_apellidoPaterno VARCHAR(64),    --  2
                                    IN	var_apellidoMaterno VARCHAR(64),    --  3
                                    IN  var_genero          VARCHAR(2),     --  4
                                    IN  var_fechaNacimiento VARCHAR(11),    --  5
                                    IN  var_rfc             VARCHAR(14),    --  6
                                    IN  var_curp            VARCHAR(19),    --  7
                                    IN	var_domicilio       VARCHAR(129),   --  8
                                    IN  var_cp              VARCHAR(11),    --  9
                                    IN  var_ciudad          VARCHAR(46),    -- 10
                                    IN  var_estado          VARCHAR(40),    -- 11
                                    IN	var_telefono        VARCHAR(20),    -- 12
                                    IN	var_foto            LONGTEXT,       -- 13
                                    
                                  /* Datos del la Sucursal */
                                    IN  var_Sucursal      VARCHAR(49),      -- 14
                                    
                                  /* Datos del Usuario    */
                                    IN  var_rol             VARCHAR(10),    -- 15
                                    
                                  /* Datos del Empleado */  
                                    IN  var_puesto          VARCHAR(25),    -- 16
                                    IN  var_salarioBruto    FLOAT,          -- 17
                                    
                                  /* Nuevos datos */
                                    IN var_nombreUsuario VARCHAR(45),       -- 18
                                    IN var_contrasenia VARCHAR(45),         -- 19
                                    IN var_email VARCHAR(65),               -- 20
                                  
                                  /* Parametros */
                                    IN var_idPersona       INT,            -- 21
                                    IN var_idUsuario       INT,            -- 22
                                    IN var_idEmpleado      INT,             -- 23
                                    
                                    IN var_fechaIngreso     varchar(11)    -- 24
                                 )
    BEGIN
        Declare var_idSucursal int;
        SET var_idSucursal = (select idSucursal from sucursal where nombre = var_Sucursal);
        -- Actualizar la tabla persona
        UPDATE persona
        SET nombre = var_nombre, apellidoPaterno = var_apellidoPaterno, apellidoMaterno = var_apellidoMaterno, 
            genero = var_genero, fechaNacimiento = STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'), rfc = var_rfc, 
            curp = var_curp, domicilio = var_domicilio, codigoPostal = var_cp, ciudad = var_ciudad, estado = var_estado,
            telefono = var_telefono, foto = var_foto
        WHERE idPersona = var_idPersona;
        -- Actualizar la tabla usuario
        UPDATE usuario
        SET nombreUsuario = var_nombreUsuario, contrasenia = var_contrasenia, rol = var_rol
        WHERE idUsuario = var_idUsuario;
        -- Actualizar la tabla empleado
        UPDATE empleado
        SET puesto = var_puesto, salarioBruto = var_salarioBruto, email = var_email, idSucursal = var_idSucursal, fechaIngreso = STR_TO_DATE(var_fechaIngreso, '%d/%m/%Y')
        WHERE idEmpleado = var_idEmpleado;
    END
$$
DELIMITER ;

-- Procedimiento almacenado para insertar una nueva sucursal.
--      Esta operacion implica que, al agregar una nueva sucursal,
--      de forma automatica se agregara un usuario administrador,
--      lo cual implica, la insercion de un empleado y una persona.
DROP PROCEDURE IF EXISTS insertarSucursal;
DELIMITER $$
CREATE PROCEDURE insertarSucursal(/* Datos Sucursal */
                                    IN	var_nombre          VARCHAR(49),    --  1
                                    IN	var_titular         VARCHAR(49),    --  2
                                    IN  var_rfc             VARCHAR(15),    --  3                                    
                                    IN	var_domicilio       VARCHAR(129),   --  4
                                    IN  var_colonia         VARCHAR(65),    --  5
                                    IN  var_codigoPostal    VARCHAR(11),    --  6
                                    IN  var_ciudad          VARCHAR(65),    --  7
                                    IN  var_estado          VARCHAR(49),    --  8                                    
                                    IN	var_telefono        VARCHAR(20),    --  9
                                    IN	var_latitud         VARCHAR(65),    -- 10
                                    IN	var_longitud        VARCHAR(65),    -- 11
                                    
                                  /* Parametros de Salida */
                                    OUT  var_idSucursal     INT,            -- 12
                                    OUT  var_idPersona      INT,            -- 13
                                    OUT  var_idUsuario      INT,            -- 14
                                    OUT  var_idEmpleado     INT,            -- 15
                                    OUT  var_codigoEmpleado VARCHAR( 9),    -- 17
                                    OUT  var_nombreUsuario  VARCHAR(33),    -- 17
                                    OUT  var_contrasenia    VARCHAR(33)     -- 18
                                 )
    BEGIN
        DECLARE idUsuarioMax INT;
    
        -- Comenzamos insertando los datos de la Sucursal:
        INSERT INTO sucursal(nombre, titular, rfc, domicilio, colonia, codigoPostal,
                             ciudad, estado, telefono, latitud, longitud, estatus)
                    VALUES(var_nombre, var_titular, var_rfc, var_domicilio, var_colonia, var_codigoPostal,
                           var_ciudad, var_estado, var_telefono, var_latitud, var_longitud, 1);
        
        -- Recuperamos el ID de la Sucursal que se genero:
        SET var_idSucursal = LAST_INSERT_ID();
                
        -- Generamos el Codigo del Empleado porque lo necesitamos
        -- para generar el usuario:
        CALL generarCodigoEmpleado(var_codigoEmpleado);
        
        -- Generamos el nombre del Usuario Administrador que por default tendra la Sucursal:
        SET idUsuarioMax      = 1 + (SELECT MAX(idUsuario) FROM usuario);
        SET var_nombreUsuario = CONCAT('Admins', idUsuarioMax);
        SET var_contrasenia   = var_nombreUsuario;
        
        -- Insertamos los datos del Usuario que tendra el Empleado:
        INSERT INTO usuario (nombreUsuario, contrasenia, rol)
                    VALUES (var_nombreUsuario, var_contrasenia, 'ADMS');
        
        -- Recuperamos el ID de Usuario generado:
        SET var_idUsuario = LAST_INSERT_ID();
        
        -- Insertamos los datos personales:
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( CONCAT('Admins_', var_titular), '', '', 
                            'O', STR_TO_DATE('01/01/1901', '%d/%m/%Y'),
                            '', '', '', '',
                            '', '', '', '');
        
        -- Recuperamos el ID de la Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID();
        
        -- Insertamos los datos del Empleado:
        INSERT INTO empleado(codigo, fechaIngreso, puesto, salarioBruto, activo,
                             idPersona, idUsuario, idSucursal, email)
                    VALUES(var_codigoEmpleado, NOW(), 'Administrador', 0.0,
                           1, var_idPersona, var_idUsuario, var_idSucursal, '');
    END
$$
DELIMITER ;


DROP PROCEDURE IF EXISTS editarSucursal;
DELIMITER $$
CREATE PROCEDURE editarSucursal(/* Datos Sucursal */
                                    IN	var_nombre          VARCHAR(49),    --  1
                                    IN	var_titular         VARCHAR(49),    --  2
                                    IN  var_rfc             VARCHAR(15),    --  3                                    
                                    IN	var_domicilio       VARCHAR(129),   --  4
                                    IN  var_colonia         VARCHAR(65),    --  5
                                    IN  var_codigoPostal    VARCHAR(11),    --  6
                                    IN  var_ciudad          VARCHAR(65),    --  7
                                    IN  var_estado          VARCHAR(49),    --  8                                    
                                    IN	var_telefono        VARCHAR(20),    --  9
                                    IN	var_latitud         VARCHAR(65),    -- 10
                                    IN	var_longitud        VARCHAR(65),     -- 11
                                    IN  var_idSucursal      INT             -- 12
                                 )
    BEGIN
        UPDATE sucursal
        SET nombre = var_nombre,
            titular = var_titular,
            rfc = var_rfc,
            domicilio = var_domicilio,
            colonia = var_colonia,
            codigoPostal = var_codigoPostal,
            ciudad = var_ciudad,
            estado = var_estado,
            telefono = var_telefono,
            latitud = var_latitud,
            longitud = var_longitud
        WHERE idSucursal = var_idSucursal;
            
    END
$$
DELIMITER ;
-- Procedimiento almacenado para insertar un nuevo cliente.
DROP PROCEDURE IF EXISTS insertarCliente;
DELIMITER $$
CREATE PROCEDURE insertarCliente(/* Datos Personales */
                                    IN	var_nombre          VARCHAR(64),    --  1
                                    IN	var_apellidoPaterno VARCHAR(64),    --  2
                                    IN	var_apellidoMaterno VARCHAR(64),    --  3
                                    IN  var_genero          VARCHAR(2),     --  4
                                    IN  var_fechaNacimiento VARCHAR(11),    --  5
                                    IN  var_rfc             VARCHAR(14),    --  6
                                    IN  var_curp            VARCHAR(19),    --  7
                                    IN	var_domicilio       VARCHAR(129),   --  8
                                    IN  var_cp              VARCHAR(11),    --  9
                                    IN  var_ciudad          VARCHAR(46),    -- 10
                                    IN  var_estado          VARCHAR(40),    -- 11
                                    IN	var_telefono        VARCHAR(20),    -- 12
                                    IN	var_foto            LONGTEXT,       -- 13
                                    
                                  /* Datos del cliente */
                                    In var_email            VARCHAR(45)    -- 14
                                 )
    BEGIN
        DECLARE var_idPersona int;
        -- iNSERTAR PERSONA
        INSERT INTO persona (nombre, apellidoPaterno, apellidoMaterno, genero,
                             fechaNacimiento, rfc, curp, domicilio, codigoPostal, 
                             ciudad, estado, telefono, foto)
                    VALUES( var_nombre, var_apellidoPaterno, var_apellidoMaterno, 
                            var_genero, STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'),
                            var_rfc, var_curp, var_domicilio, var_cp,
                            var_ciudad, var_estado, var_telefono, var_foto);
        
        -- Obtenemos el ID de Persona que se genero:
        SET var_idPersona = LAST_INSERT_ID(); 
        
        -- Insertar el cliente
        INSERT INTO cliente VALUES(default, var_email, now(), 1, var_idPersona);
    END
$$
DELIMITER ;

-- Procedimiento almacenado para editar un cliente.
DROP PROCEDURE IF EXISTS editarCliente;
DELIMITER $$
CREATE PROCEDURE editarCliente(/* Datos Personales */
                                    IN	var_nombre          VARCHAR(64),    --  1
                                    IN	var_apellidoPaterno VARCHAR(64),    --  2
                                    IN	var_apellidoMaterno VARCHAR(64),    --  3
                                    IN  var_genero          VARCHAR(2),     --  4
                                    IN  var_fechaNacimiento VARCHAR(11),    --  5
                                    IN  var_rfc             VARCHAR(14),    --  6
                                    IN  var_curp            VARCHAR(19),    --  7
                                    IN	var_domicilio       VARCHAR(129),   --  8
                                    IN  var_cp              VARCHAR(11),    --  9
                                    IN  var_ciudad          VARCHAR(46),    -- 10
                                    IN  var_estado          VARCHAR(40),    -- 11
                                    IN	var_telefono        VARCHAR(20),    -- 12
                                    IN	var_foto            LONGTEXT,       -- 13
                                    
                                  /* Datos del usuario */
                                    IN var_email VARCHAR(65),               -- 14
                                    
                                 /* ids */
                                    IN var_idPersona         int,           -- 15
                                    IN var_idCliente         int,           -- 16
                                    
                                    IN var_fechaRegistro     VARCHAR(11)     -- 17
                                 )
    BEGIN
        -- Actualizar la tabla persona
        UPDATE persona
        SET nombre = var_nombre, apellidoPaterno = var_apellidoPaterno, apellidoMaterno = var_apellidoMaterno, 
            genero = var_genero, fechaNacimiento = STR_TO_DATE(var_fechaNacimiento, '%d/%m/%Y'), rfc = var_rfc, 
            curp = var_curp, domicilio = var_domicilio, codigoPostal = var_cp, ciudad = var_ciudad, estado = var_estado,
            telefono = var_telefono, foto = var_foto
        WHERE idPersona = var_idPersona;
        -- Actualizar la tabla cliente
        UPDATE cliente
        SET email = var_email, fechaRegistro = STR_TO_DATE(var_fechaRegistro, '%d/%m/%Y')
        WHERE idCliente = var_idCliente;
    END
$$
DELIMITER ;
-- Procedimiento almacenado para insertar un nuevo producto.
DROP PROCEDURE IF EXISTS insertarProducto;
DELIMITER $$
CREATE PROCEDURE insertarProducto(
    /* Datos Personales */
      in var_nombre                VARCHAR(180),    -- 1
      in var_nombreGenerico        VARCHAR(200),    -- 2
      in var_formaFarmaceutica     VARCHAR(100),    -- 3
      in var_unidadMedida          VARCHAR(25),     -- 4
      in var_presentacion          VARCHAR(200),    -- 5    
      in var_principalIndicacion   VARCHAR(255),    -- 6
      in var_contraindicaciones    VARCHAR(255),    -- 7
      in var_concentracion         VARCHAR(255),    -- 8
      in var_unidadesEnvase        INT,             -- 9
      in var_precioCompra          FLOAT,           -- 10
      in var_precioVenta           FLOAT,           -- 11    
      in var_foto                  LONGTEXT,        -- 12
      in var_rutaFoto              VARCHAR(254),    -- 13    
      in var_codigoBarras          VARCHAR(65)      -- 14
    )  
    BEGIN
        insert into producto values (default,
            var_nombre,
            var_nombreGenerico,
            var_formaFarmaceutica,
            var_unidadMedida,
            var_presentacion,
            var_principalIndicacion,
            var_contraindicaciones,
            var_concentracion,
            var_unidadesEnvase,
            var_precioCompra,
            var_precioVenta,
            var_foto,
            var_rutaFoto,
            var_codigoBarras,
            default);
    END
$$
DELIMITER ;
DROP PROCEDURE IF EXISTS editarProducto;
DELIMITER $$
CREATE PROCEDURE editarProducto(
    /* Datos del producto */
      in var_nombre                VARCHAR(180),    -- 1
      in var_nombreGenerico        VARCHAR(200),    -- 2
      in var_formaFarmaceutica     VARCHAR(100),    -- 3
      in var_unidadMedida          VARCHAR(25),     -- 4
      in var_presentacion          VARCHAR(200),    -- 5    
      in var_principalIndicacion   VARCHAR(255),    -- 6
      in var_contraindicaciones    VARCHAR(255),    -- 7
      in var_concentracion         VARCHAR(255),    -- 8
      in var_unidadesEnvase        INT,             -- 9
      in var_precioCompra          FLOAT,           -- 10
      in var_precioVenta           FLOAT,           -- 11    
      in var_foto                  LONGTEXT,        -- 12
      in var_rutaFoto              VARCHAR(254),    -- 13    
      in var_codigoBarras          VARCHAR(65),     -- 14
      in var_idProducto            int              -- 15
    )  
    BEGIN
        update producto set
            nombre = var_nombre,
            nombreGenerico = var_nombreGenerico,
            formaFarmaceutica = var_formaFarmaceutica,
            unidadMedida = var_unidadMedida,
            presentacion = var_presentacion,
            principalIndicacion = var_principalIndicacion,
            contraindicaciones = var_contraindicaciones,
            concentracion = var_concentracion,
            unidadesEnvase = var_unidadesEnvase,
            precioCompra = var_precioCompra,
            precioVenta = var_precioVenta,
            foto = var_foto,
            rutaFoto = var_rutaFoto,
            codigoBarras = var_codigoBarras
        where idProducto = var_idProducto;
    END
$$
DELIMITER ;
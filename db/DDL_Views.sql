use sicefa;

drop view if exists v_empleados;
create view v_empleados as
select e.idEmpleado, e.codigo, e.fechaIngreso, e.puesto, e.salarioBruto, e.activo,
    p.idPersona, p.nombre, p.apellidoPaterno, p.apellidoMaterno, p.genero, p.fechaNacimiento, p.rfc, p.curp, p.domicilio, p.codigoPostal, p.ciudad, p.estado, p.telefono, p.foto,
    u.idUsuario, u.nombreUsuario, u.contrasenia, u.rol,
    s.idSucursal, s.nombre as nombreSucursal, s.titular, s.rfc as rfcSucursal, s.domicilio as domicilioSucursal, s.colonia as coloniaSucursal, s.codigoPostal as codigoPostalSucursal, s.ciudad as ciudadSucursal, s.estado as estadoSucursal, s.telefono as telefonoSucursal, s.latitud, s.longitud, s.estatus,
    e.email
    from empleado e inner join persona p on e.idPersona = p.idPersona
    inner join usuario u on e.idUsuario = u.idUsuario
    inner join sucursal s on e.idSucursal = s.idSucursal
    order by e.idEmpleado;

drop view if exists v_usuarios;
create view v_usuarios as
SELECT u.idUsuario, u.nombreUsuario, u.contrasenia, u.rol, s.nombre as 'sucursal',
    concat(p.nombre, ' ', p.apellidoPaterno, ' ', p.apellidoMaterno) as 'empleado', e.codigo FROM usuario u 
    inner join empleado e on u.idUsuario = e.idUsuario
    inner join persona p on p.idPersona = e.idPersona
    inner join sucursal s on e.idSucursal = s.idSucursal;
    
drop view if exists v_clientes;
create view v_clientes as
select c.idCliente, c.email, c.fechaRegistro, c.estatus,
    p.idPersona, p.nombre, p.apellidoPaterno, p.apellidoMaterno, p.genero, p.fechaNacimiento, p.rfc, p.curp, p.domicilio, p.codigoPostal, p.ciudad, p.estado, p.telefono, p.foto
    from cliente c inner join persona p on c.idPersona = p.idPersona
    order by c.idCliente;
    
drop view if exists v_productos;
create view v_productos as
select p.*, ifnull(i.existencias, 0) as existencias, s.nombre as sucursal
    from producto p left join inventario i on p.idProducto = i.idProducto
    left join sucursal s on s.idSucursal = i.idSucursal
    order by p.idProducto;

drop view if exists v_compras;
create view v_compras as
select c.idCompra, c.fechaHoraPedido, s.nombre as 'nombreSucursal',
    p.nombre, p.apellidoPaterno, p.apellidoMaterno,
    s.codigoPostal, s.ciudad, s.estado, 
    sum(dc.precioCompra) as 'total', group_concat(pr.nombre) as 'nombres', group_concat(dc.precioCompra) as 'precios', group_concat(dc.cantidad) as 'cantidades'
    from compra c inner join detalleCompra dc on c.idCompra = dc.idCompra
    inner join empleado e on e.idEmpleado = c.idEmpleado
    inner join sucursal s on e.idSucursal = s.idSucursal
    inner join persona p on p.idPersona = e.idPersona
    inner join producto pr on pr.idProducto = dc.idProducto
    where c.estatus = 1
    group by c.idCompra;

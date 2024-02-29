DELIMITER //
Drop Trigger if exists crearInventario//

-- Trigger para crear el registro de inventario si no existia
-- Esto sucede cuando se agreguen los productos de la compra

Create Trigger crearInventario
after insert on detalleCompra
for each row
begin
    declare sucursal int;
    set sucursal = (select idSucursal from empleado where idEmpleado = (select idEmpleado from compra where idCompra = new.idCompra));
    if (select count(*) from inventario where idSucursal = sucursal and idProducto = new.idProducto) = 0 then
        insert into inventario values (default, new.idProducto, sucursal, 0);
    end if;
end;
//
DELIMITER ;
DELIMITER //
Drop Trigger if exists aumentarInventario//

-- Trigger para aumentar el inventario al aceptar un pedido
-- El trigger es capaz de funcionar para compras que tiene varios productos

Create Trigger aumentarInventario
after update on compra
for each row
begin
    -- if (select count(*) from inventario where idSucursal)
    -- Ejecutar el incremento solo si el estatus cambio a 2:la compra fue atendida
    if new.estatus = 2 then
        update inventario i
            inner join (            
                -- Realizar una subconsulta con todos los productos que van a ser actualizados
                -- y la cantidad que se va a suma a la ya existente
                SELECT dc.idProducto, dc.cantidad AS total_comprado
                FROM compra c
                INNER JOIN detalleCompra dc ON c.idCompra = dc.idCompra
                WHERE c.idCompra = new.idCompra
            ) AS subconsulta ON i.idProducto = subconsulta.idProducto
            -- Actualizar el numero de existencias
            SET i.existencias = i.existencias + subconsulta.total_comprado;
    END IF;
end;
//
DELIMITER ;
    
# Sistema Central de Farmacias (SICEFA)


Este proyecto es un sistema central de farmacias que gestiona tanto la matriz (Central) como las sucursales. Dependiendo del tipo de usuario, se abrirá una página web específica para la Central o la Sucursal.

## Funcionalidades

### Central
- Gestión de sucursales: agregar, modificar, eliminar de manera lógica y reactivar.
- Gestión de productos: agregar, modificar, eliminar de manera lógica y reactivar.
- Gestión de pedidos realizados por las sucursales a la matriz.

### Sucursal
- Gestión de empleados: agregar, modificar, eliminar de manera lógica y reactivar.
- Gestión de clientes: agregar, modificar, eliminar de manera lógica y reactivar.
- Registro y gestión de ventas.
- Registro y gestión de compras realizadas a la matriz.

## Instalación

1. Verifica que se cuenten con los recursos necesarios:
   - Apache Netbeans 17 (recomendable)
   - Apache-tomcat-10.1.13
   - Liberica JDK 17 full 
   - MySQL Workbench 8.0 CE

2. Configuración de la Base de Datos:
   - Importa los archivos `.sql` enpezando desde:
     - `DDL_farmacia_v3.sql`
     - `DML_farmacia_v3.sql`
     - `DDL_StoredProcedures_farmacia_v3.sql`
     - `DDL_Triggers.sql`
     - `DDL_Views.sql`
   - En el archivo `ConnectionMySql.java`, configura las credenciales de acceso a la base de datos en las líneas 27 y 28 (`user` y `password`).

3. Ejecuta el proyecto web.

## Especificaciones

Las credenciales para poder acceder desde el login son:
- Central: `Administrador` / `Administrador`.
- Sucursal: `Admins2` / `Admins2`.

## Licencia

Este proyecto está bajo la Licencia [Visualización y Práctica](LICENSE).

package org.utl.dsm403.controller;

import java.sql.SQLException;
import java.util.List;
import org.utl.dsm403.model.Empleado;
import java.sql.ResultSet;
import java.util.ArrayList;
import org.utl.dsm403.model.Persona;
import org.utl.dsm403.model.Sucursal;
import org.utl.dsm403.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.CallableStatement;
import java.sql.Types;

/**
 *
 * @author h4lof
 */
public class ControllerEmpleado {
    
    // Metodo para obtener todos los empleados
    public List<Empleado> getAll(){
        // Crear la lista
        List<Empleado> empleados = new ArrayList<>();
        
        // Generar la consulta
        String query = "SELECT * FROM v_empleados;";
        
        // Craear objeto para iniciar la conexion
        ConnectionMySql objConn = new ConnectionMySql();
        
        try {
            // Abrir la conexion a la base de datos
            Connection conn = objConn.openConnection();
            
            // Ejecutar la sentencia SQL
            PreparedStatement pstmt = conn.prepareStatement(query);
            ResultSet rs = pstmt.executeQuery();
            
            // Recorre el resultado de la consulta
            while (rs.next()){
                Persona p = new Persona(
                        rs.getInt("idPersona"),
                        rs.getString("nombre"),
                        rs.getString("apellidoPaterno"),
                        rs.getString("apellidoMaterno"),
                        rs.getString("genero"),
                        rs.getString("fechaNacimiento"),
                        rs.getString("rfc"),
                        rs.getString("curp"),
                        rs.getString("domicilio"),
                        rs.getString("codigoPostal"),
                        rs.getString("ciudad"),
                        rs.getString("estado"),
                        rs.getString("telefono"),
                        rs.getString("foto"));
                Usuario u = new Usuario(
                        rs.getInt("idUsuario"),
                        rs.getString("nombreUsuario"),
                        rs.getString("contrasenia"),
                        rs.getString("rol"));
                Sucursal s = new Sucursal(
                        rs.getInt("idSucursal"),
                        rs.getString("nombreSucursal"),
                        rs.getString("titular"),
                        rs.getString("rfcSucursal"),
                        rs.getString("domicilioSucursal"),
                        rs.getString("coloniaSucursal"),
                        rs.getString("codigoPostalSucursal"),
                        rs.getString("ciudadSucursal"),
                        rs.getString("estadoSucursal"),
                        rs.getString("telefonoSucursal"),
                        rs.getString("latitud"),
                        rs.getString("longitud"),
                        rs.getInt("estatus"));
                Empleado e = new Empleado(
                        rs.getInt("idEmpleado"),
                        rs.getString("codigo"), 
                        rs.getString("fechaIngreso"),
                        rs.getString("puesto"),
                        rs.getFloat("salarioBruto"),
                        rs.getInt("activo"),
                        p,
                        u,
                        s,
                        rs.getString("email"));
                
                empleados.add(e);
            }
            
            // Cerrar statment
            rs.close();
            pstmt.close();
            
            // Cerrar la conexion a la base de datos
            objConn.closeConnection();
            
        } catch (ClassNotFoundException | SQLException e) {
            // Imprimir posibles errores
            System.err.println(e);
        }
        
        return empleados;
    }
    
    public void delete(Empleado e){
        String query = "UPDATE empleado SET activo=0 WHERE idEmpleado=" + e.getIdEmpleado();
        
        System.out.println(e.getIdEmpleado());
        // Craear objeto para iniciar la conexion
        ConnectionMySql objConn = new ConnectionMySql();
        
        try {
            // Abrir la conexion a la base de datos
            Connection conn = objConn.openConnection();
            
            // Ejecutar sentencia sql
            Statement stmt = conn.createStatement();
            stmt.executeUpdate(query); 
            
            // Cerrar conexión
            objConn.closeConnection();
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
    }
    public void reactivate(Empleado e){
        String query = "UPDATE empleado SET activo=1 WHERE idEmpleado=" + e.getIdEmpleado();
        
        
        // Craear objeto para iniciar la conexion
        ConnectionMySql objConn = new ConnectionMySql();
        
        try {
            // Abrir la conexion a la base de datos
            Connection conn = objConn.openConnection();
            
            // Ejecutar sentencia sql
            Statement stmt = conn.createStatement();
            stmt.executeUpdate(query); 
            
            // Cerrar conexión
            objConn.closeConnection();
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
    }
    
    public int insert(Empleado e) {
        
        try {
            // Generar la sentencia SQL
            String query = "{call insertarEmpleado(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            // Crear la conexion
            ConnectionMySql objConn = new ConnectionMySql();
            
            // Abrir la conexion
            Connection conn = objConn.openConnection();
            
            // Crar el statement
            CallableStatement cstm = conn.prepareCall(query);
            
            // Llenar paramentros
            cstm.setString(1, e.getPersona().getNombre());
            cstm.setString(2, e.getPersona().getApellidoPaterno());
            cstm.setString(3, e.getPersona().getApellidoMaterno());
            cstm.setString(4, e.getPersona().getGenero());
            cstm.setString(5, e.getPersona().getFechaNacimiento());
            cstm.setString(6, e.getPersona().getRfc());
            cstm.setString(7, e.getPersona().getCurp());
            cstm.setString(8, e.getPersona().getDomicilio());
            cstm.setString(9, e.getPersona().getCodigoPostal());
            cstm.setString(10, e.getPersona().getCiudad());
            cstm.setString(11, e.getPersona().getEstado());
            cstm.setString(12, e.getPersona().getTelefono());
            cstm.setString(13, e.getPersona().getFoto());
            
            cstm.setString(14, e.getSucursal().getNombre());
            
            cstm.setString(15, e.getUsuario().getRol());
            
            cstm.setString(16, e.getPuesto());
            cstm.setFloat(17, e.getSalarioBruto());
            
            cstm.setString(18, e.getUsuario().getNombreUsuario());
            cstm.setString(19, e.getUsuario().getContrasenia());
            cstm.setString(20, e.getEmail());
            
            cstm.registerOutParameter(21, Types.INTEGER);
            cstm.registerOutParameter(22, Types.INTEGER);
            cstm.registerOutParameter(23, Types.INTEGER);
            cstm.registerOutParameter(24, Types.VARCHAR);
            
            // Ejecutar la sentencia
            cstm.execute();
            
            // Obtener los paramentros de retorno
            e.getPersona().setIdPersona(cstm.getInt(21));
            e.getUsuario().setIdUsuario(cstm.getInt(22));
            e.setIdEmpleado(cstm.getInt(23));
            e.setCodigo(cstm.getString(24));
            
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
        
        return e.getIdEmpleado();
    }
    public void edit(Empleado e) {
        
        try {
            // Generar la sentencia SQL
            String query = "{call editarEmpleado(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            // Crear la conexion
            ConnectionMySql objConn = new ConnectionMySql();
            
            // Abrir la conexion
            Connection conn = objConn.openConnection();
            
            // Crar el statement
            CallableStatement cstm = conn.prepareCall(query);
            
            // Llenar paramentros
            cstm.setString(1, e.getPersona().getNombre());
            cstm.setString(2, e.getPersona().getApellidoPaterno());
            cstm.setString(3, e.getPersona().getApellidoMaterno());
            cstm.setString(4, e.getPersona().getGenero());
            cstm.setString(5, e.getPersona().getFechaNacimiento());
            cstm.setString(6, e.getPersona().getRfc());
            cstm.setString(7, e.getPersona().getCurp());
            cstm.setString(8, e.getPersona().getDomicilio());
            cstm.setString(9, e.getPersona().getCodigoPostal());
            cstm.setString(10, e.getPersona().getCiudad());
            cstm.setString(11, e.getPersona().getEstado());
            cstm.setString(12, e.getPersona().getTelefono());
            cstm.setString(13, e.getPersona().getFoto());
            
            cstm.setString(14, e.getSucursal().getNombre());
            
            cstm.setString(15, e.getUsuario().getRol());
            
            cstm.setString(16, e.getPuesto());
            cstm.setFloat(17, e.getSalarioBruto());
            
            cstm.setString(18, e.getUsuario().getNombreUsuario());
            cstm.setString(19, e.getUsuario().getContrasenia());
            cstm.setString(20, e.getEmail());
            
            cstm.setInt(21, e.getPersona().getIdPersona());
            cstm.setInt(22, e.getUsuario().getIdUsuario());
            cstm.setInt(23, e.getIdEmpleado());
            
            cstm.setString(24, e.getFechaIngreso());
                        
            // Ejecutar la sentencia
            cstm.execute();            
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
    }
    
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.controller;

import org.utl.dsm403.model.Cliente;
import java.sql.SQLException;
import java.util.List;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.CallableStatement;
import org.utl.dsm403.model.Persona;


/**
 *
 * @author h4lof
 */
public class ControllerCliente {
    
    // Metodo para obtener todos los empleados
    public List<Cliente> getAll(){
        // Crear la lista
        List<Cliente> clientes = new ArrayList<>();
        
        // Generar la consulta
        String query = "SELECT * FROM v_clientes;";
        
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
                Cliente c = new Cliente(
                        rs.getInt("idCliente"), 
                        rs.getString("email"), 
                        rs.getString("fechaRegistro"), 
                        rs.getInt("estatus"), 
                        p);
                
                clientes.add(c);
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
        
        return clientes;
    }
    public void delete(Cliente c){
        String query = "UPDATE cliente SET estatus=0 WHERE idCliente=" + c.getIdCliente();
        
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
    public void reactivate(Cliente c){
        String query = "UPDATE cliente SET estatus=1 WHERE idCliente=" + c.getIdCliente();
        
        
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
    public void insert(Cliente c) {
        
        try {
            // Generar la sentencia SQL
            String query = "{call insertarCliente(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            // Crear la conexion
            ConnectionMySql objConn = new ConnectionMySql();
            
            // Abrir la conexion
            Connection conn = objConn.openConnection();
            
            // Crar el statement
            CallableStatement cstm = conn.prepareCall(query);
            
            // Llenar paramentros
            cstm.setString(1, c.getPersona().getNombre());
            cstm.setString(2, c.getPersona().getApellidoPaterno());
            cstm.setString(3, c.getPersona().getApellidoMaterno());
            cstm.setString(4, c.getPersona().getGenero());
            cstm.setString(5, c.getPersona().getFechaNacimiento());
            cstm.setString(6, c.getPersona().getRfc());
            cstm.setString(7, c.getPersona().getCurp());
            cstm.setString(8, c.getPersona().getDomicilio());
            cstm.setString(9, c.getPersona().getCodigoPostal());
            cstm.setString(10, c.getPersona().getCiudad());
            cstm.setString(11, c.getPersona().getEstado());
            cstm.setString(12, c.getPersona().getTelefono());
            cstm.setString(13, c.getPersona().getFoto());
            
            cstm.setString(14, c.getEmail());
            
            // Ejecutar la sentencia
            cstm.execute();
            
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
        
    }
    
    public void edit(Cliente c) {
        
        try {
            // Generar la sentencia SQL
            String query = "{call editarCliente(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            // Crear la conexion
            ConnectionMySql objConn = new ConnectionMySql();
            
            // Abrir la conexion
            Connection conn = objConn.openConnection();
            
            // Crar el statement
            CallableStatement cstm = conn.prepareCall(query);
            
            // Llenar paramentros
            cstm.setString(1, c.getPersona().getNombre());
            cstm.setString(2, c.getPersona().getApellidoPaterno());
            cstm.setString(3, c.getPersona().getApellidoMaterno());
            cstm.setString(4, c.getPersona().getGenero());
            cstm.setString(5, c.getPersona().getFechaNacimiento());
            cstm.setString(6, c.getPersona().getRfc());
            cstm.setString(7, c.getPersona().getCurp());
            cstm.setString(8, c.getPersona().getDomicilio());
            cstm.setString(9, c.getPersona().getCodigoPostal());
            cstm.setString(10, c.getPersona().getCiudad());
            cstm.setString(11, c.getPersona().getEstado());
            cstm.setString(12, c.getPersona().getTelefono());
            cstm.setString(13, c.getPersona().getFoto());
            
            cstm.setString(14, c.getEmail());
            
            cstm.setInt(15, c.getPersona().getIdPersona());
            cstm.setInt(16, c.getIdCliente());
            
            cstm.setString(17, c.getFechaRegistro());
            
            // Ejecutar la sentencia
            cstm.execute();
            
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
        
    }
    
}

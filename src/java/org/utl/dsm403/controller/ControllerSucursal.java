/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.sql.CallableStatement;
import java.sql.Statement;
import java.sql.Types;
import org.utl.dsm403.model.Sucursal;

/**
 *
 * @author h4lof
 */
public class ControllerSucursal {
    
    public List<Sucursal> getAll(){
        
        List<Sucursal> listaSucursales = new ArrayList<>(); 

        //1. Crear la sentencia SQL
        String query = "SELECT * FROM sucursal";
        //2. Se establece la conexion con la BD
        ConnectionMySql connMySQL = new ConnectionMySql();
        try {
            //3. Se abre la conexion
            Connection conn = connMySQL.openConnection();
            //4. Se genera el statement para enviar la consulta
            PreparedStatement pstmt = conn.prepareStatement(query);
            //5. Se prepara un ResultSet para obtener la respuesta de la BD
            ResultSet rs = pstmt.executeQuery();
            //6. Recorrer el rs y extraer los datos 

            while (rs.next()){
                Sucursal s = new Sucursal();
                s.setIdSucursal(rs.getInt("idSucursal"));
                s.setNombre(rs.getString("nombre"));
                s.setTitular(rs.getString("titular"));
                s.setCiudad(rs.getString("ciudad"));
                s.setCodigoPostal(rs.getString("codigoPostal"));
                s.setColonia(rs.getString("colonia"));
                s.setDomicilio(rs.getString("domicilio"));
                s.setEstado(rs.getString("estado"));
                s.setEstatus(rs.getInt("estatus"));
                s.setLatitud(rs.getString("latitud"));
                s.setLongitud(rs.getString("longitud"));
                s.setRfc(rs.getString("rfc"));
                s.setTelefono(rs.getString("telefono"));   

                listaSucursales.add(s);
            }

            //7. Cerrar todos los objetos
            rs.close();
            pstmt.close();
            connMySQL.closeConnection(); 
        } catch (SQLException | ClassNotFoundException e){
            System.err.println(e);
        }

        //8. Devolver la informacion
        return listaSucursales;
    }
    
    public int insert(Sucursal s) {
        
        try {
            // Generar la sentencia SQL
            String query = "{call insertarSucursal(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            // Crear la conexion
            ConnectionMySql objConn = new ConnectionMySql();
            
            // Abrir la conexion
            Connection conn = objConn.openConnection();
            
            // Crar el statement
            CallableStatement cstm = conn.prepareCall(query);
            
            // Llenar paramentros
            cstm.setString(1, s.getNombre());
            cstm.setString(2, s.getTitular());
            cstm.setString(3, s.getRfc());
            cstm.setString(4, s.getDomicilio());
            cstm.setString(5, s.getColonia());
            cstm.setString(6, s.getCodigoPostal());
            cstm.setString(7, s.getCiudad());
            cstm.setString(8, s.getEstado());
            cstm.setString(9, s.getTelefono());
            cstm.setString(10, s.getLatitud());
            cstm.setString(11, s.getLongitud());
            
            cstm.registerOutParameter(12, Types.INTEGER);
            cstm.registerOutParameter(13, Types.INTEGER);
            cstm.registerOutParameter(14, Types.INTEGER);
            cstm.registerOutParameter(15, Types.INTEGER);
            cstm.registerOutParameter(16, Types.VARCHAR);
            cstm.registerOutParameter(17, Types.VARCHAR);
            cstm.registerOutParameter(18, Types.VARCHAR);
            
            
            // Ejecutar la sentencia
            cstm.execute();
            
            s.setIdSucursal(cstm.getInt(12));
            
            // Obtener los paramentros de retorno
            return s.getIdSucursal();
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
            return 0;
        }
        
        
    }
    
    public void edit(Sucursal s) {
        
        try {
            // Generar la sentencia SQL
            String query = "{call editarSucursal(?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            // Crear la conexion
            ConnectionMySql objConn = new ConnectionMySql();
            
            // Abrir la conexion
            Connection conn = objConn.openConnection();
            
            // Crar el statement
            CallableStatement cstm = conn.prepareCall(query);
            
            // Llenar paramentros
            cstm.setString(1, s.getNombre());
            cstm.setString(2, s.getTitular());
            cstm.setString(3, s.getRfc());
            cstm.setString(4, s.getDomicilio());
            cstm.setString(5, s.getColonia());
            cstm.setString(6, s.getCodigoPostal());
            cstm.setString(7, s.getCiudad());
            cstm.setString(8, s.getEstado());
            cstm.setString(9, s.getTelefono());
            cstm.setString(10, s.getLatitud());
            cstm.setString(11, s.getLongitud());
            cstm.setInt(12, s.getIdSucursal());
            
            
            // Ejecutar la sentencia
            cstm.execute();
            
            // Obtener los paramentros de retorno
            
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
    }
    public void delete(Sucursal s){
        String query = "UPDATE sucursal SET estatus=0 WHERE idSucursal=" + s.getIdSucursal();
        
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
    public void reactivate(Sucursal s){
        String query = "UPDATE sucursal SET estatus=1 WHERE idSucursal=" + s.getIdSucursal();        
        
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
    
}

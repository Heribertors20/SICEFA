/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author h4lof
 */
public class ControllerLogin {
    
    public String[] checkUser(String usuario, String contrasenia){
        
        String query = "SELECT * FROM v_usuarios WHERE nombreUsuario = ? AND contrasenia = ?";
        
        // Craear objeto para iniciar la conexion
        ConnectionMySql objConn = new ConnectionMySql();
        
        try {
            // Abrir la conexion a la base de datos
            Connection conn = objConn.openConnection();
            
            // Ejecutar la sentencia SQL
            PreparedStatement pstmt = conn.prepareStatement(query);
            
            pstmt.setString(1, usuario);
            pstmt.setString(2, contrasenia);
            
            ResultSet rs = pstmt.executeQuery();      
            
            if (rs.next()){
                String[] result = new String[4];
                result[0] = rs.getString("rol");
                result[1] = rs.getString("empleado");
                result[2] = rs.getString("codigo");
                result[3] = rs.getString("sucursal");
                
                return result;
            }
            
        } catch (ClassNotFoundException | SQLException e){
            System.out.println(e);
        }
        
        return null;
        
    }
    
    public void changePassword(String usuario, String contrasenia){
        
        String query = "UPDATE usuario SET contrasenia = ? WHERE nombreUsuario = ?";
        
        // Craear objeto para iniciar la conexion
        ConnectionMySql objConn = new ConnectionMySql();
        
        try {
            // Abrir la conexion a la base de datos
            Connection conn = objConn.openConnection();
            
            // Ejecutar sentencia sql
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, contrasenia);
            stmt.setString(2, usuario);
            stmt.executeUpdate(); 
            
            // Cerrar conexión
            objConn.closeConnection();
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
        
    }
    
}

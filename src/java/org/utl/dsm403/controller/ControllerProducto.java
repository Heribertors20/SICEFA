/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.controller;

import java.sql.SQLException;
import java.util.List;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.CallableStatement;
import org.utl.dsm403.model.Producto;
import org.utl.dsm403.model.Inventario;
import org.utl.dsm403.model.Sucursal;


/**
 *
 * @author h4lof
 */
public class ControllerProducto {
    
    // Metodo para obtener todos los productos
    public List<Producto> getAll(){
        // Crear la lista
        List<Producto> productos = new ArrayList<>();
        
        // Generar la consulta
        String query = "SELECT * FROM producto;";
        
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
                Producto p = new Producto(
                        rs.getInt("idProducto"), 
                        rs.getString("nombre"), 
                        rs.getString("nombreGenerico"), 
                        rs.getString("formaFarmaceutica"), 
                        rs.getString("unidadMedida"), 
                        rs.getString("presentacion"), 
                        rs.getString("principalIndicacion"), 
                        rs.getString("contraindicaciones"), 
                        rs.getString("concentracion"), 
                        rs.getInt("unidadesEnvase"), 
                        rs.getDouble("precioCompra"), 
                        rs.getDouble("precioVenta"), 
                        rs.getString("foto"), 
                        rs.getString("rutaFoto"), 
                        rs.getString("codigoBarras"),
                        rs.getInt("estatus"));
                
                productos.add(p);
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
        
        return productos;
    }
    
    // Metodo para obtener todos los productos
    public List<Inventario> getAllWhithInventario(){
        // Crear la lista
        List<Inventario> productos = new ArrayList<>();
        
        // Generar la consulta
        String query = "SELECT * FROM v_productos;";
        
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
                Producto p = new Producto(
                        rs.getInt("idProducto"), 
                        rs.getString("nombre"), 
                        rs.getString("nombreGenerico"), 
                        rs.getString("formaFarmaceutica"), 
                        rs.getString("unidadMedida"), 
                        rs.getString("presentacion"), 
                        rs.getString("principalIndicacion"), 
                        rs.getString("contraindicaciones"), 
                        rs.getString("concentracion"), 
                        rs.getInt("unidadesEnvase"), 
                        rs.getDouble("precioCompra"), 
                        rs.getDouble("precioVenta"), 
                        rs.getString("foto"), 
                        rs.getString("rutaFoto"), 
                        rs.getString("codigoBarras"),
                        rs.getInt("estatus"));
                
                Sucursal s = new Sucursal();
                s.setNombre(rs.getString("sucursal"));
                
                Inventario i = new Inventario(
                        p, 
                        s, 
                        rs.getInt("existencias"));
                
                productos.add(i);
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
        
        return productos;
    }
    
    public void delete(Producto p){
        String query = "UPDATE producto SET estatus=0 WHERE idProducto=" + p.getIdProducto();
        
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
    public void reactivate(Producto p){
        String query = "UPDATE producto SET estatus=1 WHERE idProducto=" + p.getIdProducto();
                
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
    
    public void insert(Producto p) {
        
        try {
            // Generar la sentencia SQL
            String query = "{call insertarProducto(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            // Crear la conexion
            ConnectionMySql objConn = new ConnectionMySql();
            
            // Abrir la conexion
            Connection conn = objConn.openConnection();
            
            // Crar el statement
            CallableStatement cstm = conn.prepareCall(query);
            
            // Llenar paramentros
            cstm.setString(1, p.getNombre());
            cstm.setString(2, p.getNombreGenerico());
            cstm.setString(3, p.getFormaFarmaceutica());
            cstm.setString(4, p.getUnidadMedida());
            cstm.setString(5, p.getPresentacion());
            cstm.setString(6, p.getPrincipalIndicacion());
            cstm.setString(7, p.getContraindicaciones());
            cstm.setString(8, p.getConcentracion());
            cstm.setInt(9, p.getUnidadesEnvase());
            cstm.setDouble(10, p.getPrecioCompra());
            cstm.setDouble(11, p.getPrecioVenta());
            cstm.setString(12, p.getFoto());
            cstm.setString(13, p.getRutaFoto());
            cstm.setString(14, p.getCodigoBarras());
            
            
            // Ejecutar la sentencia
            cstm.execute();
            
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
        
    }public void edit(Producto p) {
        
        try {
            // Generar la sentencia SQL
            String query = "{call editarProducto(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            // Crear la conexion
            ConnectionMySql objConn = new ConnectionMySql();
            
            // Abrir la conexion
            Connection conn = objConn.openConnection();
            
            // Crar el statement
            CallableStatement cstm = conn.prepareCall(query);
            
            // Llenar paramentros
            cstm.setString(1, p.getNombre());
            cstm.setString(2, p.getNombreGenerico());
            cstm.setString(3, p.getFormaFarmaceutica());
            cstm.setString(4, p.getUnidadMedida());
            cstm.setString(5, p.getPresentacion());
            cstm.setString(6, p.getPrincipalIndicacion());
            cstm.setString(7, p.getContraindicaciones());
            cstm.setString(8, p.getConcentracion());
            cstm.setInt(9, p.getUnidadesEnvase());
            cstm.setDouble(10, p.getPrecioCompra());
            cstm.setDouble(11, p.getPrecioVenta());
            cstm.setString(12, p.getFoto());
            cstm.setString(13, p.getRutaFoto());
            cstm.setString(14, p.getCodigoBarras());
            cstm.setInt(15, p.getIdProducto());
            
            
            // Ejecutar la sentencia
            cstm.execute();
            
            
        } catch (ClassNotFoundException | SQLException ex) {
            System.err.println(ex);
        }
        
    }
    
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm403.model.Compra;
import org.utl.dsm403.model.DetalleCompra;
import org.utl.dsm403.model.Empleado;
import org.utl.dsm403.model.Persona;
import org.utl.dsm403.model.Producto;
import org.utl.dsm403.model.Sucursal;

/**
 *
 * @author h4lof
 */
public class ControllerCompra {
    
    public List<Compra> getAll(){
        // Crear la lista
        List<Compra> compras = new ArrayList<>();
        
        // Generar la consulta
        String query = "SELECT * FROM v_compras;";
        
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
                
                ArrayList<DetalleCompra> productos = new ArrayList<>();
                
                String[] nombres = rs.getString("nombres").split(",");
                String[] precios = rs.getString("precios").split(",");
                String[] cantidades = rs.getString("cantidades").split(",");
                
                for (int i = 0; i < nombres.length; i++) {
                    Producto producto = new Producto();
                    producto.setNombre(nombres[i]);
                    
                    DetalleCompra dc = new DetalleCompra(
                            producto, 
                            Integer.parseInt(cantidades[i]), 
                            Float.parseFloat(precios[i]));
                    
                    productos.add(dc);
                }
                
                
                Sucursal s = new Sucursal(
                        0, 
                        rs.getString("nombreSucursal"), 
                        "", 
                        "", 
                        "", 
                        "", 
                        rs.getString("codigoPostal"), 
                        rs.getString("ciudad"), 
                        rs.getString("estado"), 
                        "",
                        "", 
                        "", 
                        0);
                Persona p = new Persona(
                        0, 
                        rs.getString("nombre"), 
                        rs.getString("apellidoPaterno"), 
                        rs.getString("apellidoMaterno"), 
                        "", 
                        "", 
                        "", 
                        "", 
                        "", 
                        "", 
                        "",
                        "",
                        "", 
                        "");
                Empleado e = new Empleado(
                        0, 
                        "", 
                        "", 
                        "", 
                        0, 
                        0, 
                        p, 
                        null, 
                        s, 
                        "");
                Compra c = new Compra(
                        rs.getInt("idCompra"),
                        rs.getString("fechaHoraPedido"),
                        0,
                        0,
                        e,
                        productos,
                        rs.getDouble("total")
                );
                
                compras.add(c);
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
        
        return compras;
    }
    public void atenderPedido(Compra c){
        String query = "UPDATE compra SET estatus=2 WHERE idCompra=" + c.getIdCompra();
        
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

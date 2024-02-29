/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.model;

import java.util.ArrayList;

/**
 *
 * @author h4lof
 */
public class Compra {
    
    private int idCompra;
    private String fechaHoraPedido;
    private int estatus;
    private int activo;
    private Empleado empleado;
    private ArrayList<DetalleCompra> productos;
    private double total;

    public Compra() {
    }

    public Compra(int idCompra, String fechaHoraPedido, int estatus, int activo, Empleado empleado, ArrayList<DetalleCompra> productos, double total) {
        this.idCompra = idCompra;
        this.fechaHoraPedido = fechaHoraPedido;
        this.estatus = estatus;
        this.activo = activo;
        this.empleado = empleado;
        this.productos = productos;
        this.total = total;
    }

    public Compra(String fechaHoraPedido, int estatus, int activo, Empleado empleado, ArrayList<DetalleCompra> productos, double total) {
        this.fechaHoraPedido = fechaHoraPedido;
        this.estatus = estatus;
        this.activo = activo;
        this.empleado = empleado;
        this.productos = productos;
        this.total = total;
    }
        
       

    public int getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }

    public String getFechaHoraPedido() {
        return fechaHoraPedido;
    }

    public void setFechaHoraPedido(String fechaHoraPedido) {
        this.fechaHoraPedido = fechaHoraPedido;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public ArrayList<DetalleCompra> getProductos() {
        return productos;
    }

    public void setProductos(ArrayList<DetalleCompra> productos) {
        this.productos = productos;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
    
    

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Compra{");
        sb.append("idCompra:").append(idCompra);
        sb.append(", fechaHoraPedido:").append(fechaHoraPedido);
        sb.append(", estatus:").append(estatus);
        sb.append(", activo:").append(activo);
        sb.append(", empleado:").append(empleado);
        sb.append(", productos:").append(productos);
        sb.append(", total:").append(total);
        sb.append('}');
        return sb.toString();
    }
    
    
    
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.model;

/**
 *
 * @author h4lof
 */
public class Inventario {
    private int idInventario;
    private Producto producto;
    private Sucursal sucursal;
    private int existencias;

    public Inventario() {
    }

    public Inventario(int idInventario, Producto producto, Sucursal sucursal, int existencias) {
        this.idInventario = idInventario;
        this.producto = producto;
        this.sucursal = sucursal;
        this.existencias = existencias;
    }

    public Inventario(Producto producto, Sucursal sucursal, int existencias) {
        this.producto = producto;
        this.sucursal = sucursal;
        this.existencias = existencias;
    }

    public int getExistencias() {
        return existencias;
    }

    public void setExistencias(int existencias) {
        this.existencias = existencias;
    }

    public int getIdInventario() {
        return idInventario;
    }

    public void setIdInventario(int idInventario) {
        this.idInventario = idInventario;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Inventario{");
        sb.append("idInventario:").append(idInventario);
        sb.append(", producto:").append(producto);
        sb.append(", sucursal:").append(sucursal);
        sb.append(", existencias:").append(existencias);
        sb.append('}');
        return sb.toString();
    }
    
    
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.model;

/**
 *
 * @author h4lof
 */
public class DetalleCompra {
    private Producto producto;
    private int cantidad;
    private float precioCompra;

    public DetalleCompra() {
    }

    public DetalleCompra(Producto producto, int cantidad, float precioCompra) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioCompra = precioCompra;
    }
    
    

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public float getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(float precioCompra) {
        this.precioCompra = precioCompra;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("DetalleCompra{");
        sb.append("producto:").append(producto);
        sb.append(", cantidad:").append(cantidad);
        sb.append(", precioCompra:").append(precioCompra);
        sb.append('}');
        return sb.toString();
    }
    
    
    
}

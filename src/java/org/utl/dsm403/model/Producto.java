/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.model;

/**
 *
 * @author h4lof
 */
public class Producto {
    
    private int idProducto;
    private String nombre;
    private String nombreGenerico;
    private String formaFarmaceutica;
    private String unidadMedida;
    private String presentacion;
    private String principalIndicacion;
    private String contraindicaciones;
    private String concentracion;
    private int unidadesEnvase;
    private double precioCompra;
    private double precioVenta;
    private String foto;
    private String rutaFoto;
    private String codigoBarras;
    private int estatus;

    public Producto() {
    }

    public Producto(int idProducto, String nombre, String nombreGenerico, String formaFarmaceutica, String unidadMedida, String presentacion, String principalIndicacion, String contraindicaciones, String concentracion, int unidadesEnvase, double precioCompra, double precioVenta, String foto, String rutaFoto, String codigoBarras, int estatus) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.nombreGenerico = nombreGenerico;
        this.formaFarmaceutica = formaFarmaceutica;
        this.unidadMedida = unidadMedida;
        this.presentacion = presentacion;
        this.principalIndicacion = principalIndicacion;
        this.contraindicaciones = contraindicaciones;
        this.concentracion = concentracion;
        this.unidadesEnvase = unidadesEnvase;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.foto = foto;
        this.rutaFoto = rutaFoto;
        this.codigoBarras = codigoBarras;
        this.estatus = estatus;
    }

    public Producto(String nombre, String nombreGenerico, String formaFarmaceutica, String unidadMedida, String presentacion, String principalIndicacion, String contraindicaciones, String concentracion, int unidadesEnvase, double precioCompra, double precioVenta, String foto, String rutaFoto, String codigoBarras, int estatus) {
        this.nombre = nombre;
        this.nombreGenerico = nombreGenerico;
        this.formaFarmaceutica = formaFarmaceutica;
        this.unidadMedida = unidadMedida;
        this.presentacion = presentacion;
        this.principalIndicacion = principalIndicacion;
        this.contraindicaciones = contraindicaciones;
        this.concentracion = concentracion;
        this.unidadesEnvase = unidadesEnvase;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.foto = foto;
        this.rutaFoto = rutaFoto;
        this.codigoBarras = codigoBarras;
        this.estatus = estatus;
    }
    
    

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreGenerico() {
        return nombreGenerico;
    }

    public void setNombreGenerico(String nombreGenerico) {
        this.nombreGenerico = nombreGenerico;
    }

    public String getFormaFarmaceutica() {
        return formaFarmaceutica;
    }

    public void setFormaFarmaceutica(String formaFarmaceutica) {
        this.formaFarmaceutica = formaFarmaceutica;
    }

    public String getUnidadMedida() {
        return unidadMedida;
    }

    public void setUnidadMedida(String unidadMedida) {
        this.unidadMedida = unidadMedida;
    }

    public String getPresentacion() {
        return presentacion;
    }

    public void setPresentacion(String presentacion) {
        this.presentacion = presentacion;
    }

    public String getPrincipalIndicacion() {
        return principalIndicacion;
    }

    public void setPrincipalIndicacion(String principalIndicacion) {
        this.principalIndicacion = principalIndicacion;
    }

    public String getContraindicaciones() {
        return contraindicaciones;
    }

    public void setContraindicaciones(String contraindicaciones) {
        this.contraindicaciones = contraindicaciones;
    }

    public String getConcentracion() {
        return concentracion;
    }

    public void setConcentracion(String concentracion) {
        this.concentracion = concentracion;
    }

    public int getUnidadesEnvase() {
        return unidadesEnvase;
    }

    public void setUnidadesEnvase(int unidadesEnvase) {
        this.unidadesEnvase = unidadesEnvase;
    }

    public double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(double precioVenta) {
        this.precioVenta = precioVenta;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getRutaFoto() {
        return rutaFoto;
    }

    public void setRutaFoto(String rutaFoto) {
        this.rutaFoto = rutaFoto;
    }

    public String getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Producto{");
        sb.append("idProducto:").append(idProducto);
        sb.append(", nombre:").append(nombre);
        sb.append(", nombreGenerico:").append(nombreGenerico);
        sb.append(", formaFarmaceutica:").append(formaFarmaceutica);
        sb.append(", unidadMedida:").append(unidadMedida);
        sb.append(", presentacion:").append(presentacion);
        sb.append(", principalIndicacion:").append(principalIndicacion);
        sb.append(", contraindicaciones:").append(contraindicaciones);
        sb.append(", concentracion:").append(concentracion);
        sb.append(", unidadesEnvase:").append(unidadesEnvase);
        sb.append(", precioCompra:").append(precioCompra);
        sb.append(", precioVenta:").append(precioVenta);
        sb.append(", foto:").append(foto);
        sb.append(", rutaFoto:").append(rutaFoto);
        sb.append(", codigoBarras:").append(codigoBarras);
        sb.append(", estatus:").append(estatus);
        sb.append('}');
        return sb.toString();
    }
    
    
    
}

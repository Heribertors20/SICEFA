package org.utl.dsm403.model;

/**
 *
 * @author h4lof
 */
public class Persona {
    private int idPersona;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String genero;
    private String fechaNacimiento;
    private String rfc;
    private String curp;
    private String domicilio;
    private String codigoPostal;
    private String ciudad;
    private String estado;
    private String telefono;
    private String foto;
    
    public Persona(){}

    // Constructor sin ID para insertar Datos
    public Persona(String nombre, String apellidoPaterno, String apellidoMaterno, String genero, String fechaNacimiento, String rfc, String curp, String domicilio, String codigoPostal, String ciudad, String estado, String telefono, String foto) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.genero = genero;
        this.fechaNacimiento = fechaNacimiento;
        this.rfc = rfc;
        this.curp = curp;
        this.domicilio = domicilio;
        this.codigoPostal = codigoPostal;
        this.ciudad = ciudad;
        this.estado = estado;
        this.telefono = telefono;
        this.foto = foto;
    }
            
    // Construcctor con ID para extraer Datos
    public Persona(int idPersona, String nombre, String apellidoPaterno, 
            String apellidoMaterno, String genero, String fechaNacimiento, 
            String rfc, String curp, String domicilio, String codigoPostal, 
            String ciudad, String estado, String telefono, String foto) {
        this.idPersona = idPersona;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.genero = genero;
        this.fechaNacimiento = fechaNacimiento;
        this.rfc = rfc;
        this.curp = curp;
        this.domicilio = domicilio;
        this.codigoPostal = codigoPostal;
        this.ciudad = ciudad;
        this.estado = estado;
        this.telefono = telefono;
        this.foto = foto;
    }

    public int getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(int idPersona) {
        this.idPersona = idPersona;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(String fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getRfc() {
        return rfc;
    }

    public void setRfc(String rfc) {
        this.rfc = rfc;
    }

    public String getCurp() {
        return curp;
    }

    public void setCurp(String curp) {
        this.curp = curp;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Persona{");
        sb.append("idPersona:").append(idPersona);
        sb.append(", nombre:").append(nombre);
        sb.append(", apellidoPaterno:").append(apellidoPaterno);
        sb.append(", apellidoMaterno:").append(apellidoMaterno);
        sb.append(", genero:").append(genero);
        sb.append(", fechaNacimiento:").append(fechaNacimiento);
        sb.append(", rfc:").append(rfc);
        sb.append(", curp:").append(curp);
        sb.append(", domicilio:").append(domicilio);
        sb.append(", codigoPostal:").append(codigoPostal);
        sb.append(", ciudad:").append(ciudad);
        sb.append(", estado:").append(estado);
        sb.append(", telefono:").append(telefono);
        sb.append(", foto:").append(foto);
        sb.append('}');
        return sb.toString();
    }
    
    
}

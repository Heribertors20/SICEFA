package org.utl.dsm403.model;

/**
 *
 * @author h4lof
 */
public class Usuario {
    private int idUsuario;
    private String nombreUsuario;
    private String contrasenia;
    private String rol;
    
    public Usuario(){}

    // Constructor sin ID para insertar Datos
    public Usuario(String nombreUsuario, String contrasenia, String rol) {
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.rol = rol;
    }
  
    // Construcctor con ID para extraer Datos

    public Usuario(int idUsuario, String nombreUsuario, String contrasenia, String rol) {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.rol = rol;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Usuario{");
        sb.append("idUsuario:").append(idUsuario);
        sb.append(", nombreUsuario:").append(nombreUsuario);
        sb.append(", contrasenia:").append(contrasenia);
        sb.append(", rol:").append(rol);
        sb.append('}');
        return sb.toString();
    }
    
    
  
}

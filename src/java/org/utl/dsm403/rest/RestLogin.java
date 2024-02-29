/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.dsm403.controller.ControllerLogin;
import org.utl.dsm403.model.Usuario;

/**
 *
 * @author h4lof
 */
@Path("restlogin")
public class RestLogin {
    @Path("login")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("UnusedAssignment")
    public Response insert(@FormParam("u") @DefaultValue("xd") String usuario){
        
        Gson objGson = new Gson();
        Usuario u = objGson.fromJson(usuario, Usuario.class);
        
        String out;
        
        ControllerLogin objCL = new ControllerLogin();
                     
        String[] s = objCL.checkUser(u.getNombreUsuario(), u.getContrasenia());
        
        if (s != null){
            out = """
              {"success":"Empleado encontrado",
                  "rol":"%S",
                  "empleado":"%S",
                  "codigo":"%S",
                  "sucursal":"%s"}
              """;
            out = String.format(out, s[0], s[1], s[2], s[3]);
        } else {
            out = """
              {"error":"Empleado no encontrado"}
              """;
        }
        System.out.println(out);
        return Response.ok(out).build();
    }
    
    @Path("changepassword")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("UnusedAssignment")
    public Response changePassword(@FormParam("u") @DefaultValue("xd") String usuario){
        
        Gson objGson = new Gson();
        Usuario u = objGson.fromJson(usuario, Usuario.class);
        System.out.println(u);
        
        ControllerLogin objCL = new ControllerLogin();
                     
        objCL.changePassword(u.getNombreUsuario(), u.getContrasenia());
        
        String out = """
              {"success":"Empleado encontrado"}
              """;
        return Response.ok(out).build();
    }
}

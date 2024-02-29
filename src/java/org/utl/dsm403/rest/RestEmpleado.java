/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm403.controller.ControllerEmpleado;
import org.utl.dsm403.model.Empleado;

/**
 *
 * @author h4lof
 */
@Path("restempleado")
public class RestEmpleado {
 
    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        ControllerEmpleado objCE = new ControllerEmpleado();
        
        List<Empleado> listEmpleados = objCE.getAll();
        
        String out;
        if (!listEmpleados.isEmpty()){
            
            Gson objGson = new Gson();
            out = objGson.toJson(listEmpleados);
        } else {
            out = """
                  {"error":"Se produjo un error en la ejecucion"}
                  """;
        }
        
        return Response.ok(out).build();
    }
    
    @Path("delete")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@QueryParam("idE") @DefaultValue("0") String idE){
        
        // Objeto de empleado
        Empleado e = new Empleado();
        e.setIdEmpleado(Integer.parseInt(idE));
        
        // Eliminar empleado
        ControllerEmpleado objCE = new ControllerEmpleado();
        objCE.delete(e);
        
        String out = """
                  {"result":"Ok"}
                  """;
        return Response.ok(out).build();
    }
    @Path("reactivate")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response reactivate(@QueryParam("idE") @DefaultValue("0") String idE){
                
        // Objeto de empleado
        Empleado e = new Empleado();
        e.setIdEmpleado(Integer.parseInt(idE));
        
        // Eliminar empleado
        ControllerEmpleado objCE = new ControllerEmpleado();
        objCE.reactivate(e);
        
        String out = """
                  {"result":"Ok"}
                  """;
        return Response.ok(out).build();
    }
    
    @Path("insert")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("UnusedAssignment")
    public Response insert(@FormParam("e") @DefaultValue("xd") String empleado){
        
        Gson objGson = new Gson();
        Empleado e = objGson.fromJson(empleado, Empleado.class);
        
        String out;
        
        ControllerEmpleado objCE = new ControllerEmpleado();
        
        int idGenerado = objCE.insert(e);
        
        if (idGenerado != 0){
            out = """
              {"result":"Empleado insertado exitosamente con id: %s"}
              """;
            out = String.format(out, idGenerado);
        } else {
            out = """
              {"error":"Error al insertar el empleado"}
              """;
        }
        return Response.ok(out).build();
    }
    
    @Path("edit")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("UnusedAssignment")
    public Response edit(@FormParam("e") @DefaultValue("xd") String empleado){
        
        Gson objGson = new Gson();
        Empleado e = objGson.fromJson(empleado, Empleado.class);
        
        System.out.println(e);
        
        ControllerEmpleado objCE = new ControllerEmpleado();
        
        objCE.edit(e);
        
        String out = """
              {"result":"Empleado editado exitosamente"}
              """;
        return Response.ok(out).build();
    }
        
}
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
import org.utl.dsm403.controller.ControllerSucursal;
import org.utl.dsm403.model.Sucursal;

/**
 *
 * @author h4lof
 */

@Path("restsucursal")
public class RestSucursal {
    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        ControllerSucursal objCS = new ControllerSucursal();
        
        List<Sucursal> listSucursales = objCS.getAll();
        
        String out;
        if (!listSucursales.isEmpty()){
            
            Gson objGson = new Gson();
            out = objGson.toJson(listSucursales);
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
    public Response delete(@QueryParam("idS") @DefaultValue("0") String idS){
       
        
        // Objeto de empleado
        Sucursal s = new Sucursal();
        s.setIdSucursal(Integer.parseInt(idS));
        
        // Eliminar empleado
        ControllerSucursal objCS = new ControllerSucursal();
        objCS.delete(s);
        
        String out = """
                  {"result":"Sucursal Eliminada"}
                  """;
        return Response.ok(out).build();
    }
    @Path("reactivate")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response reactivate(@QueryParam("idS") @DefaultValue("0") String idS){
        
        // Objeto de empleado
        Sucursal s = new Sucursal();
        s.setIdSucursal(Integer.parseInt(idS));
        
        // Eliminar empleado
        ControllerSucursal objCS = new ControllerSucursal();
        objCS.reactivate(s);
        
        String out = """
                  {"result":"Ok"}
                  """;
        return Response.ok(out).build();
    }
    @Path("insert")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("UnusedAssignment")
    public Response insert(@FormParam("s") @DefaultValue("xd") String sucursal){
        
        Gson objGson = new Gson();
        Sucursal s = objGson.fromJson(sucursal, Sucursal.class);
                
        String out;
        
        ControllerSucursal objCS = new ControllerSucursal();
        
        int idGenerado = objCS.insert(s);
        
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
    public Response edit(@FormParam("s") @DefaultValue("xd") String sucursal){
        
        Gson objGson = new Gson();
        Sucursal s = objGson.fromJson(sucursal, Sucursal.class);
                
        ControllerSucursal objCS = new ControllerSucursal();
        
        objCS.edit(s);
        
        String out = """
              {"result":"Empleado editado exitosamente"}
              """;
        return Response.ok(out).build();
    }
}

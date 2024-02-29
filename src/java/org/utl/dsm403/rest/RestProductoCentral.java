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
import org.utl.dsm403.controller.ControllerProducto;
import org.utl.dsm403.model.Producto;

/**
 *
 * @author h4lof
 */
@Path("restproductocentral")
public class RestProductoCentral {
    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        ControllerProducto objCP = new ControllerProducto();
        
        List<Producto> listProductos = objCP.getAll();
        
        String out;
        if (!listProductos.isEmpty()){
            
            Gson objGson = new Gson();
            out = objGson.toJson(listProductos);
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
    public Response delete(@QueryParam("idP") @DefaultValue("0") String idP){
       
        
        // Objeto de prodcuto
        Producto p = new Producto();
        p.setIdProducto(Integer.parseInt(idP));
        
        // Eliminar producto
        ControllerProducto objCP = new ControllerProducto();
        objCP.delete(p);
        
        String out = """
                  {"result":"Producto Eliminado"}
                  """;
        return Response.ok(out).build();
    }
    @Path("reactivate")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response reactivate(@QueryParam("idP") @DefaultValue("0") String idP){
        
        // Objeto de empleado
        Producto p = new Producto();
        p.setIdProducto(Integer.parseInt(idP));
        
        // Eliminar empleado
        ControllerProducto objCP = new ControllerProducto();
        objCP.reactivate(p);
        
        String out = """
                  {"result":"Ok"}
                  """;
        return Response.ok(out).build();
    }
    @Path("insert")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("UnusedAssignment")
    public Response insert(@FormParam("p") @DefaultValue("xd") String producto){
        
        Gson objGson = new Gson();
        Producto p = objGson.fromJson(producto, Producto.class);
                
        String out;
        
        ControllerProducto objCP = new ControllerProducto();
        
        objCP.insert(p);
        
        out = """
              {"result":"Producto insertado exitosamente"}
              """;
        
        return Response.ok(out).build();
    }
    
    @Path("edit")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("UnusedAssignment")
    public Response edit(@FormParam("p") @DefaultValue("xd") String producto){
        
        Gson objGson = new Gson();
        Producto p = objGson.fromJson(producto, Producto.class);
                
        ControllerProducto objCP = new ControllerProducto();
        
        objCP.edit(p);
        
        String out = """
              {"result":"Producto editado exitosamente"}
              """;
        return Response.ok(out).build();
    }
}

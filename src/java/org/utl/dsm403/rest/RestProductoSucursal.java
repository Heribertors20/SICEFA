/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm403.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.utl.dsm403.controller.ControllerProducto;
import org.utl.dsm403.model.Inventario;

/**
 *
 * @author h4lof
 */

@Path("restproductosucursal")
public class RestProductoSucursal {
    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        ControllerProducto objCP = new ControllerProducto();
        
        List<Inventario> listProductos = objCP.getAllWhithInventario();
        
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
}

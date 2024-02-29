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
import org.utl.dsm403.controller.ControllerCompra;
import org.utl.dsm403.model.Compra;

/**
 *
 * @author h4lof
 */
@Path("restcompra")
public class RestCompra {
    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        ControllerCompra objCC = new ControllerCompra();
        
        List<Compra> listCompras = objCC.getAll();
        
        String out;
        if (!listCompras.isEmpty()){
            
            Gson objGson = new Gson();
            out = objGson.toJson(listCompras);
        } else {
            out = """
                  {"error":"Se produjo un error en la ejecucion"}
                  """;
        }
        
        return Response.ok(out).build();
    }
    @Path("atender")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@QueryParam("idC") @DefaultValue("0") String idC){
               
        // Objeto de compra
        Compra c = new Compra();
        c.setIdCompra(Integer.parseInt(idC));
        
        // Atender compra
        ControllerCompra objCC = new ControllerCompra();
        objCC.atenderPedido(c);
        
        String out = """
                  {"result":"Compra Atendida"}
                  """;
        return Response.ok(out).build();
    }
}

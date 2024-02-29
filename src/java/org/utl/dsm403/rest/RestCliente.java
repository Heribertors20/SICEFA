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
import org.utl.dsm403.controller.ControllerCliente;
import org.utl.dsm403.model.Cliente;

/**
 *
 * @author h4lof
 */
@Path("restcliente")
public class RestCliente {
    
    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        ControllerCliente objCC = new ControllerCliente();
        
        List<Cliente> listClientes = objCC.getAll();
        
        String out;
        if (!listClientes.isEmpty()){
            
            Gson objGson = new Gson();
            out = objGson.toJson(listClientes);
        } else {
            out = """
                  {"error":"Se produjo un error en la ejecución"}
                  """;
        }
        
        return Response.ok(out).build();
    }
    
    @Path("delete")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@QueryParam("idC") @DefaultValue("0") String idC){
        
        // Objeto de cliente
        Cliente c = new Cliente();
        c.setIdCliente(Integer.parseInt(idC));
        
        // Eliminar cliente
        ControllerCliente objCC = new ControllerCliente();
        objCC.delete(c);
        
        String out = """
                  {"result":"Ok"}
                  """;
        return Response.ok(out).build();
    }
    @Path("reactivate")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response reactivate(@QueryParam("idC") @DefaultValue("0") String idC){
                
        // Objeto de cliente
        Cliente c = new Cliente();
        c.setIdCliente(Integer.parseInt(idC));
        
        // Eliminar empleado
        ControllerCliente objCC = new ControllerCliente();
        objCC.reactivate(c);
        
        String out = """
                  {"result":"Ok"}
                  """;
        return Response.ok(out).build();
    }
    
    @Path("insert")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("UnusedAssignment")
    public Response insert(@FormParam("c") @DefaultValue("xd") String cliente){
        
        Gson objGson = new Gson();
        Cliente c = objGson.fromJson(cliente, Cliente.class);
        
        String out;
        
        ControllerCliente objCC = new ControllerCliente();
        
        objCC.insert(c);
        
        out = """
              {"result":"Cliente insertado exitosamente"}
              """;
        
        return Response.ok(out).build();
    }
    
    @Path("edit")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("UnusedAssignment")
    public Response edit(@FormParam("c") @DefaultValue("xd") String cliente){
        
        Gson objGson = new Gson();
        Cliente c = objGson.fromJson(cliente, Cliente.class);
        
        
        ControllerCliente objCC = new ControllerCliente();
        
        objCC.edit(c);
        
        String out = """
              {"result":"Cliente editado exitosamente"}
              """;
        return Response.ok(out).build();
    }
    
}

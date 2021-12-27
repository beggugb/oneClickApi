import ClienteService from "../services/ClienteService";
import ModuloService from "../services/ModuloService";
import ProcesoService from "../services/ProcesoService";
import EmpresaService from "../services/EmpresaService";
import SucursalService from "../services/SucursalService";
import HorarioService from "../services/HorarioService"
import MailController from "./MailController";
import PaqueteService from "../services/PaqueteService"
import ContratoService from "../services/ContratoService"
import NotaService from "../services/NotaService"
import PlanService from "../services/PlanService"
import FavoritoService from "../services/FavoritoService"
import fFecha from "../utils/fFecha"
import formatear from "../utils/formatear"

import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt-nodejs");

class ConsultaController {

  
  static searchReclutamiento(req, res) {      
    const { page,num,nombre } = req.body     
    FavoritoService.searchFavoritos(page,num,nombre)                
      .then((data) => {        
        res.status(200).send({ message: "lista", result: data });           
        })                     
      .catch((reason) => {
          console.log(reason)
        res.status(400).send({ reason });
      }); 
  }

  static getFavoritos(req, res) {
    const d = new Date() 
    var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]  
    FavoritoService.getClientes(req.params.prop,req.params.value,formatted)
      .then((data) => {            
        res.status(200).send({ message: "lista", result: data });
      })
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ message: reason });
      });      
}

  static getData(req, res) {  
    /**1,2,categoriaId,categoriaId */            
    ClienteService.getConsulta(req.params.page,req.params.num,req.params.prop,req.params.orden)                
      .then((clientes) => {
        const dato = formatear.unificar(clientes.data)
        res.status(200).send({ result: {paginas: clientes.paginas,pagina:clientes.pagina,total:clientes.total,data:dato }});
        })                     
      .catch((reason) => {
        res.status(400).send({ reason });
      });   
  }

  static getItem(req, res) {                           
      Promise.all([ClienteService.item(req.params.id),SucursalService.getAlls(req.params.id)])
        .then(([cliente,sucursales]) => {       
          let iok = {}
          iok.views = parseInt(cliente.views) + 1
            ClienteService.updt(iok,req.params.id)
              .then((ipdt) => {                                
                res.status(200).send({ message: "cliente", cliente:  cliente, sucursales: sucursales });                  
              })          
          })
          .catch((reason) => {
            res.status(400).send({ message: reason });
          });      
  }    

  static getSearch(req, res) {            
    const { page,num,categoria,nombre,latitude, longitude } = req.body 
    console.log('###############')
    console.log(req.body)
      ClienteService.getSearch(page,num,categoria,nombre,latitude,longitude)                
      .then((clientes) => {
        const dato = formatear.unificar(clientes.data,latitude,longitude) 
        res.status(200).send({ result: {paginas: clientes.paginas,pagina:clientes.pagina,total:clientes.total,data:dato }});
           
        })                     
      .catch((reason) => {
          console.log(reason)
        res.status(400).send({ reason });
      }); 
    }  

    static getList(req, res) {      
      SucursalService.getMapasCliente(req.params.prop)
        .then((sucursales) => {
          /*const data = refactorizar(clientes, sucursales)*/
          res.status(200).send({ message: "lista", result: sucursales });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    }  

    static getEmergencias(req, res) {
      Promise.all([ClienteService.getMapas('emergencia'),SucursalService.getMapas('emergencia')])
        .then(([clientes, sucursales]) => {
          
          const data = refactorizar(clientes, sucursales)
          res.status(200).send({ message: "lista", result: data });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    }

    static getServicios(req, res) {
      Promise.all([ClienteService.getMapas('servicio'),SucursalService.getMapas('servicio')])
        .then(([clientes, sucursales]) => {
          const data = refactorizar(clientes, sucursales)
          res.status(200).send({ message: "lista", result: data });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    }
    
    static getComidas(req, res) {
      Promise.all([ClienteService.getMapas('comida'),SucursalService.getMapas('comida')])
        .then(([clientes, sucursales]) => {
          const data = refactorizar(clientes, sucursales)
          res.status(200).send({ message: "lista", result: data });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    }

    static getCajeros(req, res) {
      Promise.all([ClienteService.getMapasCajero('cajero',req.params.id),SucursalService.getMapasCajero('cajero',req.params.id)])
        .then(([clientes, sucursales]) => {
          const data = refactorizar(clientes, sucursales)
          res.status(200).send({ message: "lista", result: data });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    
    }
    static getBancos(req, res) {
      ClienteService.getBancos()
        .then((clientes) => {          
          res.status(200).send({ message: "lista", result: clientes });
        })
        .catch((reason) => {
          console.log(reason)
          res.status(400).send({ message: reason });
        });
    
    }

     
}     
function refactorizar(data1, data2){
  const newData = []
  data1.map((item)=>{
    let tem = {}
    tem.key = item.id,
    tem.title = item.nombres,
    tem.description = item.descripcion,
    tem.tipo = item.tipo,    
    tem.filename = item.filename,
    tem.icon = item.icon,
    tem.telefono = item.telefono,
    tem.celular = item.celular,
    tem.longitude = parseFloat(item.longitude),
    tem.latitude = parseFloat(item.latitude)
    newData.push(tem)
  })
  data2.map((item)=>{
    let tem = {}
    tem.key = item.id,
    tem.title = item.nombre,    
    tem.tipo = item.tipo,    
    tem.icon = item.icon,
    tem.filename = item.filename,		
    tem.description = "",
    tem.telefono = item.telefono,
    tem.celular = item.celular,
    tem.longitude = parseFloat(item.longitude),
    tem.latitude = parseFloat(item.latitude)
    newData.push(tem)
  })
  return newData

}

export default ConsultaController;

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

import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt-nodejs");

class ClienteController {

  

  static listar(req, res) {
    ClienteService.getList(req.params.name)
      .then((result) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static add(req, res) {        
    if (req.body.email) {
      const dato = req.body
      dato.password = 'onclickbo'       
      dato.username = dato.nombres     
      dato.registrado = true      
      ClienteService.add(dato)
        .then((cliente) => {  
          /*console.log(cliente.id)          */
          let horas = Array()
            for (let i = 1; i <= 7; i++) {
              let date = {}
                date.dia = i;
                date.hinicio = '07:00:00'
                date.hfin = '19:00:00'
                date.clienteId = cliente.id
                horas.push(date)
            }
            HorarioService.add(horas)
            .then((horas) => {              
              res.status(200).send({ message: "cliente", result: cliente });
            })             
        })
        .catch((reason) => {         
          console.log(reason) 
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

  static search(req, res) {                
    ClienteService.search(1, 12, req.params.nombres)
      .then((clientes) => {            
        res.status(200).send({ message: "lista", result: clientes });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }
  static actualizar(req, res) {    
    ClienteService.update(req.body, req.params.id)
      .then((cliente) => {
        res.status(200).send({ message: "cliente", result: cliente });
      })
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ message: reason });
      });
  }
  static getItems(req, res) {    
    ClienteService.getItems()
      .then((cliente) => {
        res.status(200).send({ message: "cliente", result: cliente });
      })
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ message: reason });
      });
  }

  static lista(req, res) {            
    ClienteService.getData(req.params.page,req.params.num,req.params.prop,req.params.orden)                
      .then((clientes) => {
           res.status(200).send({ result: clientes });
        })                     
      .catch((reason) => {
        res.status(400).send({ reason });
      });   
  }
  static getItem(req, res) {        
    if (req.params.id) {
    ClienteService.getId(req.params.id)
      .then((cliente) => {              
        Promise.all([           
            HorarioService.getHorariosc(cliente.id,"clienteId"),
            SucursalService.getAll(cliente.id)])
              .then(([horarios, sucursales]) => {                                
                res.status(200).send({ message: "cliente", cliente:  cliente, horarios:horarios, sucursales: sucursales });
              })        
      })
      .catch((reason) => {
         res.status(400).send({ message: reason });
      });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

 /* static getData(req, res) {            
    Promise.all([ClienteService.getData(req.params.page,req.params.num,req.params.prop,req.params.orden)])                
      .then(([clientes]) => {
           res.status(200).send({ result: clientes });
        })                     
      .catch((reason) => {
        res.status(400).send({ reason });
      });   
  }
*/
  static getSearch(req, res) {            
    Promise.all([ClienteService.getData(req.params.page,req.params.num,req.params.prop,req.params.orden)])                
      .then(([clientes]) => {
           res.status(200).send({ result: clientes });
        })                     
      .catch((reason) => {
        res.status(400).send({ reason });
      });   
  }
  static login(req, res) {
    const { username, password } = req.body;
    ClienteService.login(username, password)
      .then((cliente) => {
        if (cliente.user) {
          Promise.all([
            ModuloService.getRol(cliente.user.rolId),
            ProcesoService.add("Ingreso al sistema", cliente.user.id),
          ]).then(([modulos]) => {
            res.status(200).json({ cliente, modulos });
          });
        } else {
          res.status(400).send({ success: false, message: cliente.message });
        }
      })
    .catch((reason) => {
      console.log(reason)
        res.status(400).send({ reason });
    });        
  }

}     


export default ClienteController;

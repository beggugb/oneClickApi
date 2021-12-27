import FavoritoService from "../services/FavoritoService"
import fFecha from "../utils/fFecha"

import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt-nodejs");

class FavoritoController {


  
  static getItem(req, res) {        
    if (req.params.id) {
    FavoritoService.getId(req.params.id)
      .then((cliente) => {                                                      
        res.status(200).send({ message: "postulacion", postulacion:  cliente });      
      })
      .catch((reason) => {
         res.status(400).send({ message: reason });
      });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

  static add(req, res) {             
      FavoritoService.add(req.body)
        .then((cliente) => {            
              res.status(200).send({ message: "cliente", result: cliente });
        })                     
        .catch((reason) => {         
          console.log(reason) 
          res.status(400).send({ message: reason });
        });    
  }

  static actualizar(req, res) {    
    FavoritoService.update(req.body, req.params.id)
      .then((cliente) => {
        res.status(200).send({ message: "cliente", result: cliente });
      })
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ message: reason });
      });
  }

  static delete(req, res) {                
    FavoritoService.delete(req.params.id)
        .then((clientes) => {          
          FavoritoService.getClientes(1,12)
            .then((data) => {            
                res.status(200).send({ message: "lista", result: data });
            })          
        })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }


  static lista(req, res) {            
    FavoritoService.getData(req.params.page,req.params.num,1,12)                
      .then((clientes) => {
           res.status(200).send({ result: clientes });
        })                     
      .catch((reason) => {
        res.status(400).send({ reason });
      });   
  }

  static search(req, res) {                
    FavoritoService.search(1, 12, req.params.nombres)
      .then((clientes) => {            
        res.status(200).send({ message: "lista", result: clientes });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
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


export default FavoritoController;

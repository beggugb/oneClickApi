import UbicacionesService from "../services/UbicacionesService";


class UbicacionesController {

      static getUbicaciones(req, res) {
        UbicacionesService.getAll(1,10,req.params.id)
          .then((clientes) => {              
             res.status(200).send({ message: "lista", result: clientes });
          })
          .catch((reason) => {
            res.status(400).send({ message: reason });
          });
      }
      
}

export default UbicacionesController;

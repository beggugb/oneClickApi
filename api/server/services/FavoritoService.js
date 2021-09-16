import database from "../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Favorito } = database;

class FavoritoService {

    static delete(favoritoId) {
        return new Promise((resolve, reject) => {
          Favorito.destroy({
            where: { id: favoritoId },
          })
            .then((cliente) => resolve(cliente))
            .catch((reason) => reject(reason));
        });
    }

    static add(newContrato) {
        return new Promise((resolve, reject) => {
            Favorito.create(newContrato)
                .then((contrato) => resolve(contrato))
                .catch((reason) => reject(reason));
        });
    }

  static getAllUsuario(userId) {
      console.log(userId)
    return new Promise((resolve, reject) => {       
      Favorito.findAll({
        raw: true,
        nest: true,	    
        order: [["id", "ASC"]],  
        where: { usuarioId: userId },        
        attributes: ["id","clienteId","usuarioId"]        
      })
        .then((favoritos) =>
          resolve(favoritos)
        )
        .catch((reason) => reject(reason));
    });
  }


  
}

export default FavoritoService;

import database from "../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Favorito, Cliente } = database;

class FavoritoService {

  static searchFavoritos(page,num,nombres) {
    return new Promise((resolve, reject) => {                 	    
      let der = (num * page) - num;                  
      let iName = '%' + nombres + '%'
      if (nombres === 0 || nombres === null || nombres === '0') { iName = '%' }
      
      Favorito.findAndCountAll({
        raw: true,
        nest: true,
	      offset: der,
        limit: num,    
        order: [['fvencimiento','ASC']],  
        where: {"cargo": {[Op.iLike]: iName }},     
        include: [{ 
          model: Cliente,           
          attributes: ["id", "nombres","direccion","email","telefono","celular","filename"]                 
        }]    

      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: parseInt(page),
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

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

  static getClientes(pag,num) {  
    return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Favorito.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['fvencimiento','ASC']],   
        /*where: { rolId: { [Op.eq]: 1 } },*/
        include: [{ 
          model: Cliente,           
          attributes: ["id", "nombres","direccion","email","telefono","celular","filename"]                 
        }]     
      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: page,
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });      
  }
  
}

export default FavoritoService;

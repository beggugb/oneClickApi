import database from "../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Favorito, Cliente } = database;

class FavoritoService {

  static search(page, num, nombres) {
    return new Promise((resolve, reject) => {
      let der = (num * page) - num;
      let iName = '%' + nombres + '%'
      if (nombres === '0' || nombres === 0 || nombres === undefined || nombres === null || nombres === '') { iName = '%' }
      Favorito.findAndCountAll({
        offset: 0,
        raw: true,
        nest: true,
        limit: 12,
        where: {
          [Op.and]: [
            { cargo: { [Op.iLike]: iName } },            
          ]
        }, 
        order: [['fvencimiento','DESC']],                   
        include: [
          { model: Cliente, attributes: ["id", "nombres","direccion","email","telefono","celular","filename"] }
        ]               
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

  static getData(pag,num) {
    return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Favorito.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['fvencimiento','DESC']],                   
        include: [
          { model: Cliente, attributes: ["id", "nombres","direccion","email","telefono","celular","filename"] }
        ]
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

  static getId(clienteId) {
    return new Promise((resolve, reject) => {
      const dia = new Date()  
      const dd = dia.getDay()
      Favorito.findByPk(clienteId,{        
        include: [
        { model: Cliente, attributes: ["id", "nombres","direccion","email","telefono","celular","filename"] }
      ]
      })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

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
    static update(dato, datoId) {
      return new Promise((resolve, reject) => {
        Favorito.update(dato, { where: { id: Number(datoId) } })
          .then((cliente) => resolve(cliente))
          .catch((reason) => reject(reason));
      });
    }

  static getClientes(pag,num,fecha) {  
    return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Favorito.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['fvencimiento','ASC']],   
        where: { fvencimiento: { [Op.gte]: fecha} },
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

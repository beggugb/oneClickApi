import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Ubicaciones } = database;

class UbicacionesService {
  
  static getAll(page,num,cliente) {
    return new Promise((resolve, reject) => {      
    let der = (num * page) - num;
      Ubicaciones.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,	    
        order: [['id', 'DESC'],],          
        where: { usuarioId: { [Op.eq]: cliente } },
        })
	.then((clientes) =>
        resolve({
          paginas: Math.ceil(clientes.count / num),
          pagina: parseInt(page),
          total: clientes.count,
          data: clientes.rows,
        })
        )    
      
        .catch(reason => reject(reason))

    })
  }

  static add(newSucursal) {
    return new Promise((resolve, reject) => {
      Ubicaciones
        .create(newSucursal)
        .then(Sucursal => resolve(Sucursal))
        .catch(reason => reject(reason))
    })
  }


}

export default UbicacionesService;

import { Router } from "express";
import KeyToken from "./keyToken";
import ConsultaController from "../controllers/ConsultaController";

const router = Router();

router.get('/data/:page/:num/:prop/:orden', ConsultaController.getData);
router.post('/search/lista', ConsultaController.getSearch);
router.get('/item/:id', ConsultaController.getItem);
router.get('/list/:prop/:value', ConsultaController.getList);
router.get("/lista/emergencias", ConsultaController.getEmergencias);
router.get("/lista/servicios", ConsultaController.getServicios);
router.get("/lista/comidas", ConsultaController.getComidas);
router.get("/lista/cajeros", ConsultaController.getCajeros);
/*router.get("/lista/:page/:num/:categoria/:estado/:nombre", ClienteController.consulta);
router.post("/",ClienteController.marcar);
router.delete("/:id",ClienteController.desmarcar);
router.get("/:id", ClienteController.getIte);
router.get("/lista/servicios", ClienteController.getServicios);
router.get("/lista/emergencias", ClienteController.getEmergencias);
router.get("/lista/comidas", ClienteController.getComidas);
router.get("/lista/cajeros", ClienteController.getCajeros);
router.get("/lista/favoritos/:page/:num/:id", ClienteController.getFavoritos);*/


/*router.get('/data/:page/:num/:prop/:orden', ClienteController.getData);
router.get('/list/:prop/:value', ClienteController.getList);
router.get('/item/:id', ClienteController.getItem);
router.get('/items/:prop/:value', ClienteController.getItems);
router.put('/:id/:tipo', ClienteController.setUpdate);
router.delete('/:id/:tipo', ClienteController.getDelete);
router.post('/:tipo', ClienteController.setAdd);
router.post('/search/lista', ClienteController.getSearch);*/

export default router;

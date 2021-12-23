import { Router } from "express";
import KeyToken from "./keyToken";
import ConsultaController from "../controllers/ConsultaController";

const router = Router();

router.get('/data/:page/:num/:prop/:orden', ConsultaController.getData);
router.post('/search/lista', ConsultaController.getSearch);
router.get('/item/:id', ConsultaController.getItem);
router.get('/list/:prop/:value', ConsultaController.getList);
router.get("/lista/emergencias/:id", ConsultaController.getEmergencias);
router.get("/lista/servicios/:id", ConsultaController.getServicios);
router.get("/lista/comidas/:id", ConsultaController.getComidas);
router.get("/lista/cajeros/:id", ConsultaController.getCajeros);
router.get("/lista/bancos/:id", ConsultaController.getBancos);
export default router;

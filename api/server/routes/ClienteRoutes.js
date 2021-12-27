import { Router } from "express";
import KeyToken from "./keyToken";
import ClienteController from "../controllers/ClienteController";

const router = Router();

router.post("/login", ClienteController.login);

/* Enlaces Protegidos */
router.get("/lista/:page/:num/:prop/:orden", ClienteController.lista);
router.get("/:id", ClienteController.getItem);
router.put("/:id", ClienteController.actualizar);
router.get("/search/:nombres", ClienteController.search);
router.post("/", ClienteController.add);
router.get('/items/:prop/:value', ClienteController.getItems);
router.get('/listar/:name', ClienteController.listar);

/*router.get("/vusername/:username", ClienteController.vusername);
router.delete("/:id", ClienteController.deleteCliente);
router.get("/:id", ClienteController.getItem);
router.get("/totales/items",ClienteController.totales);
router.get("/sucursales/mapas/:id", ClienteController.getSucursales);
router.get('/data/:page/:num/:prop/:orden', ClienteController.getData);
router.get('/list/:prop/:value', ClienteController.getList);
router.get('/item/:id', ClienteController.getItem);
router.get('/items/:prop/:value', ClienteController.getItems);
router.put('/:id/:tipo', ClienteController.setUpdate);
router.delete('/:id/:tipo', ClienteController.getDelete);
router.post('/:tipo', ClienteController.setAdd);
router.post('/search/lista', ClienteController.getSearch);*/

export default router;

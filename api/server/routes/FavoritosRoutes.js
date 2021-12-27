import { Router } from "express";
import KeyToken from "./keyToken";
import ConsultaController from "../controllers/ConsultaController";
import FavoritoController from "../controllers/FavoritoController";
const router = Router();

router.get('/list/:prop/:value', ConsultaController.getFavoritos);
router.post('/search/lista', ConsultaController.searchReclutamiento);
router.get("/search/:nombres", FavoritoController.search);

router.get("/lista/:page/:num/:prop/:orden", FavoritoController.lista);
router.get("/:id", FavoritoController.getItem);
router.post("/", FavoritoController.add);
router.put("/:id", FavoritoController.actualizar);
router.delete("/:id", FavoritoController.delete);
export default router;

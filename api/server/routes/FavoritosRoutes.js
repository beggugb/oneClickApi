import { Router } from "express";
import KeyToken from "./keyToken";
import ConsultaController from "../controllers/ConsultaController";

const router = Router();

router.get('/list/:prop/:value', ConsultaController.getFavoritos);
router.post('/search/lista', ConsultaController.searchReclutamiento);

export default router;

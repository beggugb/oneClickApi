import { Router } from 'express';
import UbicacionesController from '../controllers/UbicacionesController';
const router = Router();

/*Protected*/
router.get("/lista/favoritos/:page/:num/:id", UbicacionesController.getUbicaciones);
/*router.get("/:id", UbicacionesController.getItem);
router.post("/", UbicacionesController.add);
router.put("/:id", UbicacionesController.actualizar);
router.get("/search/:nombres", UbicacionesController.search);*/

export default router;


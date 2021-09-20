import { Router } from 'express';
import UbicacionesController from '../controllers/UbicacionesController';
const router = Router();

/*Protected*/
router.get("/lista/favoritos/:page/:num/:id", UbicacionesController.getUbicaciones);
export default router;


import { Router } from 'express';
import KeyToken from './keyToken'
import UsuarioController from '../controllers/UsuarioController';

const router = Router();

router.post('/login', UsuarioController.login);
router.post('/', UsuarioController.addUsuario);
router.get("/:id", UsuarioController.getItem);
router.post("/panico", UsuarioController.sendPanico);
router.put("/:id", UsuarioController.update);
router.post('/actualizar', UsuarioController.actualizar);
router.get("/actualizar/:id", UsuarioController.getItems);
export default router;


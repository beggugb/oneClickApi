import consultasRoutes from './ConsultasRoutes'
import categoriaRoutes from './CategoriaRoutes'
import favoritosRoutes from './FavoritosRoutes'
import clienteRoutes from './ClienteRoutes'
import paqueteRoutes from './PaqueteRoutes'
import horarioRoutes from './HorarioRoutes'
import fileRoutes from './FileRoutes'
import sucursalRoutes from './SucursalRoutes'
import contratoRoutes from './ContratoRoutes'
import usuarioRoutes from './UsuarioRoutes'
import ubicacionRoutes from './UbicacionesRoutes'
import mensajesRoutes from './MensajesRoutes'
export default (app) => {
	app.use('/api/consultas', consultasRoutes);
	app.use('/api/categorias', categoriaRoutes);
	app.use('/api/favoritos', favoritosRoutes);
	app.use('/api/clientes', clienteRoutes);
	app.use('/api/paquetes', paqueteRoutes);
	app.use('/api/categorias', categoriaRoutes);	
	app.use('/api/horarios', horarioRoutes);
	app.use('/api/files', fileRoutes);
	app.use('/api/sucursales', sucursalRoutes);
	app.use('/api/horarios', horarioRoutes);
	app.use('/api/contratos', contratoRoutes);	
	app.use('/api/usuarios', usuarioRoutes);	
	app.use('/api/ubicaciones', ubicacionRoutes)	
	app.use('/api/mensajes',mensajesRoutes)
}

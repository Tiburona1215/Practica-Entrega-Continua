import express from 'express';
import {renderSeriesPage} from '../controllers/SController.js';
import { renderDetalleSerie } from '../controllers/SController.js';
import { renderMantSeries } from '../controllers/SController.js';
import { renderAgregarSeries } from '../controllers/SController.js';
import { GuardarSerie } from '../controllers/SController.js';
import { EditarSerie } from '../controllers/SController.js';
import { SaveEditSerie } from '../controllers/SController.js';
import { EliminarSerie } from '../controllers/SController.js';
import { renderMantgeneros } from '../controllers/SController.js';
import { renderAgregarGeneros } from '../controllers/SController.js';
import { GuardarGenero } from '../controllers/SController.js';
import { EditarGenero } from '../controllers/SController.js';
import { SaveEditGenero } from '../controllers/SController.js';
import { EliminarGenero } from '../controllers/SController.js';
const router = express.Router();

//home route
router.get('/', renderSeriesPage);

router.get('/series/:id', renderDetalleSerie);

router.get('/agregargen', renderAgregarGeneros);
router.post('/agregargen', GuardarGenero);

router.get('/editargen/:id', EditarGenero);
router.post('/editargen/:id', SaveEditGenero);

router.post('/eliminargen/:id', EliminarGenero);

router.get('/agregar', renderAgregarSeries);
router.post('/agregar', GuardarSerie);

router.get('/PDatosS', renderMantSeries);
router.get('/PDatos', renderMantgeneros);

router.get('/editar/:id', EditarSerie);
router.post('/editar/:id', SaveEditSerie);

router.post('/eliminar/:id', EliminarSerie);
export default router;
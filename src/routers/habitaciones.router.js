import express from 'express';
import {
  cambiarEstadoHabitacionController,
  deleteHabitacionController,
  getHabitacionByCapacidadController,
  getHabitacionByIdController,
  getHabitacionesController,
  getHabitacionesDisponiblesController,
  postHabitacionesController,
  putHabitacionController
} from '../controllers/habitaciones.controller.js';
import {
  responderErroresValidacion,
  validarActualizacionHabitacion,
  validarCambioEstadoHabitacion,
  validarCapacidadHabitacion,
  validarCreacionHabitacion,
  validarIdHabitacion
} from '../validations/habitaciones.validation.js';

const router = express.Router();

router.get('/habitaciones', getHabitacionesController);
router.post('/habitaciones', validarCreacionHabitacion, responderErroresValidacion, postHabitacionesController);
router.get('/habitaciones/disponibles', getHabitacionesDisponiblesController);
router.get('/habitaciones/capacidad/:capacidad', validarCapacidadHabitacion, responderErroresValidacion, getHabitacionByCapacidadController);
router.get('/habitaciones/:id', validarIdHabitacion, responderErroresValidacion, getHabitacionByIdController);
router.put('/habitaciones/:id', validarActualizacionHabitacion, responderErroresValidacion, putHabitacionController);
router.delete('/habitaciones/:id', validarIdHabitacion, responderErroresValidacion, deleteHabitacionController);
router.patch('/habitaciones/:id/estado', validarCambioEstadoHabitacion, responderErroresValidacion, cambiarEstadoHabitacionController);

export default router;

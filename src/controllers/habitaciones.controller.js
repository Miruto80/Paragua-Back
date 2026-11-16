import {
  cambiarEstadoHabitacion,
  deleteHabitacion,
  getHabitacionByCapacidad,
  getHabitacionById,
  getHabitaciones,
  getHabitacionesDisponibles,
  postHabitaciones,
  putHabitacion
} from '../services/habitaciones.service.js';

const handleError = (res, error) => {
  const status = error.message === 'Habitación no encontrada' ? 404 : 500;
  return res.status(status).json({ message: error.message });
};

export const getHabitacionesController = async (_req, res) => {
  try {
    res.json(await getHabitaciones());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postHabitacionesController = async (req, res) => {
  const body = req.body || {};

  try {
    res.status(201).json(await postHabitaciones(body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getHabitacionByIdController = async (req, res) => {
  try {
    const habitacion = await getHabitacionById(req.params.id);
    if (!habitacion) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    return res.json(habitacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getHabitacionByCapacidadController = async (req, res) => {
  try {
    const habitacion = await getHabitacionByCapacidad(req.params.capacidad);
    if (!habitacion) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }
    return res.json(habitacion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const putHabitacionController = async (req, res) => {
  try {
    res.json(await putHabitacion(req.params.id, req.body || {}));
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteHabitacionController = async (req, res) => {
  try {
    res.json(await deleteHabitacion(req.params.id));
  } catch (error) {
    return handleError(res, error);
  }
};

export const cambiarEstadoHabitacionController = async (req, res) => {
  const { estado } = req.body || {};

  try {
    res.json(await cambiarEstadoHabitacion(req.params.id, estado));
  } catch (error) {
    return handleError(res, error);
  }
};

export const getHabitacionesDisponiblesController = async (_req, res) => {
  try {
    res.json(await getHabitacionesDisponibles());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

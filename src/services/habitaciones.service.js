import {Habitaciones} from '../models/index.js';

export const getHabitaciones = async () => {
    try {
        const habitaciones = await Habitaciones.findAll();
        return habitaciones;
    } catch (error) {
        throw new Error("Error al obtener las habitaciones");
    }
};

export const postHabitaciones = async (habitacionesData) => {
    try {
        const habitaciones = await Habitaciones.create(habitacionesData);
        return habitaciones;
    } catch (error) {
        throw new Error("Error al crear la habitación");
    }     
}

export const getHabitacionById = async (id) => {
    try {
        const habitacion = await Habitaciones.findByPk(id);
        return habitacion;
    } catch (error) {
        throw new Error("Error al obtener la habitación");
    }
};

export const getHabitacionByCapacidad = async (capacidad) => {
    try {
        const habitacion = await Habitaciones.findOne({ where: { capacidad } });
        return habitacion;
    } catch (error) {
        throw new Error("Error al obtener la habitación por capacidad");
    }
};

export const putHabitacion = async (id, habitacionesData) => {
    try {
        const habitacion = await Habitaciones.findByPk(id);
        if (!habitacion) {
            throw new Error("Habitación no encontrada");
        }
        await habitacion.update(habitacionesData);
        return habitacion;
    } catch (error) {
        if (error.message === "Habitación no encontrada") {
            throw error;
        }
        throw new Error("Error al actualizar la habitación");
    }
};

export const deleteHabitacion = async (id) => {
    try {
        const habitacion = await Habitaciones.findByPk(id);
        if (!habitacion) {
            throw new Error("Habitación no encontrada");
        }
        await habitacion.destroy();
        return habitacion;
    } catch (error) {
        if (error.message === "Habitación no encontrada") {
            throw error;
        }
        throw new Error("Error al eliminar la habitación");
    }
};

export const cambiarEstadoHabitacion = async (id, estado) => {
    try {
        const habitacion = await Habitaciones.findByPk(id);
        if (!habitacion) {
            throw new Error("Habitación no encontrada");
        }
        habitacion.estatus = estado;
        await habitacion.save();
        return habitacion;
    } catch (error) {
        if (error.message === "Habitación no encontrada") {
            throw error;
        }
        throw new Error("Error al cambiar el estado de la habitación");
    }
};

export const getHabitacionesDisponibles = async () => {
    try {
        const habitaciones = await Habitaciones.findAll({ where: { estatus: 'activa' } });
        return habitaciones;
    } catch (error) {
        throw new Error("Error al obtener las habitaciones disponibles");
    }
};

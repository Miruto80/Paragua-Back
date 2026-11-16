import { Habitaciones, Roles } from './models/index.js';

export const seedInitialData = async () => {
  const roles = [
    { nombre: 'admin', descripcion: 'Administración del hotel' },
    { nombre: 'recepcionista', descripcion: 'Gestión de recepción y reservas' }
  ];

  for (const role of roles) {
    await Roles.findOrCreate({
      where: { nombre: role.nombre },
      defaults: role
    });
  }

  const habitacion = {
    numero: '101',
    piso: 1,
    capacidad: 2,
    precio_por_persona: 12.5,
    descripcion: 'Habitación de muestra para dos personas',
    estatus: 'activa'
  };

  await Habitaciones.findOrCreate({
    where: { numero: habitacion.numero },
    defaults: habitacion
  });
};

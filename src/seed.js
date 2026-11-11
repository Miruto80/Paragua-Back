import { Roles } from './models/index.js';

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
};

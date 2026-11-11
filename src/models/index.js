import sequelize from '../database/db.js';
import { Clientes, associateClientes } from './Clientes.model.js';
import { Habitaciones, associateHabitaciones } from './Habitaciones.model.js';
import { Pagos, associatePagos } from './Pagos.model.js';
import { Reservas, associateReservas } from './Reservas.model.js';
import { Roles, associateRoles } from './Roles.model.js';
import { Usuarios, associateUsuarios } from './Usuarios.model.js';

export const associateAllModels = (models = sequelize.models) => {
  associateRoles(models);
  associateUsuarios(models);
  associateClientes(models);
  associateHabitaciones(models);
  associateReservas(models);
  associatePagos(models);
};

export { Clientes, Habitaciones, Pagos, Reservas, Roles, Usuarios };
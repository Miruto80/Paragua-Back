import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export const Clientes = sequelize.define('Clientes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombres: { type: DataTypes.STRING(100), allowNull: false },
  apellidos: { type: DataTypes.STRING(100), allowNull: false },
  cedula: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING(30), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: true },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, { tableName: 'clientes' });

export const associateClientes = (models = sequelize.models) => {
  Clientes.hasMany(models.Reservas, { foreignKey: 'cliente_id', as: 'reservas' });
};

import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export const Usuarios = sequelize.define('Usuarios', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rol_id: { type: DataTypes.INTEGER, allowNull: false },
  nombres: { type: DataTypes.STRING(100), allowNull: false },
  apellidos: { type: DataTypes.STRING(100), allowNull: false },
  cedula: { type: DataTypes.STRING(30), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING(30), allowNull: false },
  password: { type: DataTypes.TEXT, allowNull: false },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, { tableName: 'usuarios' });

export const associateUsuarios = (models = sequelize.models) => {
  Usuarios.belongsTo(models.Roles, { foreignKey: 'rol_id', as: 'rol' });
  Usuarios.hasMany(models.Reservas, { foreignKey: 'usuario_id', as: 'reservas_gestionadas' });
};

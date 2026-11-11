import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export const Roles = sequelize.define('Roles', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  descripcion: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'roles' });

export const associateRoles = (models = sequelize.models) => {
  Roles.hasMany(models.Usuarios, { foreignKey: 'rol_id', as: 'usuarios' });
};

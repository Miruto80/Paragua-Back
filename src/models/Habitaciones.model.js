import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export const Habitaciones = sequelize.define('Habitaciones', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  numero: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 2, max: 7 }
  },
  precio_por_persona: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } },
  descripcion: { type: DataTypes.TEXT, allowNull: true },
  activa: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, { tableName: 'habitaciones' });

export const associateHabitaciones = (models = sequelize.models) => {
  Habitaciones.hasMany(models.Reservas, { foreignKey: 'habitacion_id', as: 'reservas' });
};

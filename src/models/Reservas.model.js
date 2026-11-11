import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export const Reservas = sequelize.define('Reservas', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cliente_id: { type: DataTypes.INTEGER, allowNull: false },
  habitacion_id: { type: DataTypes.INTEGER, allowNull: false },
  usuario_id: { type: DataTypes.INTEGER, allowNull: true },
  fecha_entrada: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_salida: { type: DataTypes.DATEONLY, allowNull: false },
  cantidad_personas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 7 }
  },
  noches: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
  precio_por_persona: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0 } },
  monto_total: { type: DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } },
  modalidad: {
    type: DataTypes.ENUM('presencial', 'online'),
    allowNull: false,
    defaultValue: 'presencial'
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmada', 'en_curso', 'finalizada', 'cancelada'),
    allowNull: false,
    defaultValue: 'confirmada'
  },
  observaciones: { type: DataTypes.TEXT, allowNull: true }
},{ tableName: 'reservas' });
 

export const associateReservas = (models = sequelize.models) => {
  Reservas.belongsTo(models.Clientes, { foreignKey: 'cliente_id', as: 'cliente' });
  Reservas.belongsTo(models.Habitaciones, { foreignKey: 'habitacion_id', as: 'habitacion' });
  Reservas.belongsTo(models.Usuarios, { foreignKey: 'usuario_id', as: 'usuario' });
  Reservas.hasMany(models.Pagos, { foreignKey: 'reserva_id', as: 'pagos' });
};

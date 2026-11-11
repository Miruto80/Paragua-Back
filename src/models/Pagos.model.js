import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

export const Pagos = sequelize.define('Pagos', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  reserva_id: { type: DataTypes.INTEGER, allowNull: false },
  usuario_id: { type: DataTypes.INTEGER, allowNull: true },
  tipo: {
    type: DataTypes.ENUM('pago', 'penalizacion_cancelacion', 'reembolso'),
    allowNull: false,
    defaultValue: 'pago'
  },
  metodo_pago: {
    type: DataTypes.ENUM('efectivo', 'transferencia', 'tarjeta', 'otro'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmado', 'anulado'),
    allowNull: false,
    defaultValue: 'confirmado'
  },
  monto: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: { min: 0.01 }
  },
  referencia: { type: DataTypes.STRING(100), allowNull: true },
  comprobante: { type: DataTypes.STRING(255), allowNull: true },
  fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  observaciones: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'pagos' });

export const associatePagos = (models = sequelize.models) => {
  Pagos.belongsTo(models.Reservas, { foreignKey: 'reserva_id', as: 'reserva' });
  Pagos.belongsTo(models.Usuarios, { foreignKey: 'usuario_id', as: 'usuario' });
};

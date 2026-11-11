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
}, {
  tableName: 'reservas',
  hooks: {
    beforeValidate: async (reserva) => {
      if (reserva.fecha_entrada && reserva.fecha_salida) {
        const entrada = Date.parse(`${reserva.fecha_entrada}T00:00:00Z`);
        const salida = Date.parse(`${reserva.fecha_salida}T00:00:00Z`);

        if (Number.isFinite(entrada) && Number.isFinite(salida)) {
          reserva.noches = Math.floor((salida - entrada) / 86400000);
        }
      }

      if (reserva.habitacion_id) {
        const habitacion = await sequelize.models.Habitaciones.findByPk(reserva.habitacion_id);

        if (habitacion) {
          if (reserva.cantidad_personas > habitacion.capacidad) {
            throw new Error('La cantidad de personas supera la capacidad de la habitación');
          }

          if (reserva.isNewRecord || reserva.changed('habitacion_id') || reserva.precio_por_persona == null) {
            reserva.precio_por_persona = habitacion.precio_por_persona;
          }
        }
      }

      if (reserva.cantidad_personas && reserva.noches && reserva.precio_por_persona != null) {
        const tarifaEnCentimos = Math.round(Number(reserva.precio_por_persona) * 100);
        reserva.monto_total = (tarifaEnCentimos * reserva.cantidad_personas * reserva.noches / 100).toFixed(2);
      }
    }
  },
  validate: {
    salidaPosteriorAEntrada() {
      if (this.fecha_entrada && this.fecha_salida && this.fecha_salida <= this.fecha_entrada) {
        throw new Error('La fecha de salida debe ser posterior a la fecha de entrada');
      }
    }
  }
});

export const associateReservas = (models = sequelize.models) => {
  Reservas.belongsTo(models.Clientes, { foreignKey: 'cliente_id', as: 'cliente' });
  Reservas.belongsTo(models.Habitaciones, { foreignKey: 'habitacion_id', as: 'habitacion' });
  Reservas.belongsTo(models.Usuarios, { foreignKey: 'usuario_id', as: 'usuario' });
  Reservas.hasMany(models.Pagos, { foreignKey: 'reserva_id', as: 'pagos' });
};

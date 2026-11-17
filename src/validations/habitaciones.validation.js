import { body, param, validationResult } from 'express-validator';

const estadosValidos = ['activa', 'inactiva', 'limpieza', 'ocupada', 'reservada'];

export const validarIdHabitacion = [
  param('id').isInt({ min: 1 }).withMessage('El id debe ser un entero positivo').toInt()
];

export const validarCapacidadHabitacion = [
  param('capacidad')
    .isInt({ min: 2, max: 7 })
    .withMessage('La capacidad debe ser un entero entre 2 y 7')
    .toInt()
];

export const validarCreacionHabitacion = [
  body('numero').trim().notEmpty().withMessage('El número es requerido'),
  body('piso')
    .isInt({ min: 1 })
    .withMessage('El piso debe ser un entero positivo')
    .toInt(),
  body('capacidad')
    .isInt({ min: 2, max: 7 })
    .withMessage('La capacidad debe ser un entero entre 2 y 7')
    .toInt(),
  body('precio_por_persona')
    .isFloat({ min: 0 })
    .withMessage('El precio por persona debe ser un número mayor o igual a 0')
    .toFloat(),
  body('descripcion').optional().isString().withMessage('La descripción debe ser texto'),
  body('estatus').optional().isIn(estadosValidos).withMessage('El estatus no es válido')
];

export const validarActualizacionHabitacion = [
  ...validarIdHabitacion,
  body('numero').optional().trim().notEmpty().withMessage('El número no puede estar vacío'),
  body('piso')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El piso debe ser un entero positivo')
    .toInt(),
  body('capacidad')
    .optional()
    .isInt({ min: 2, max: 7 })
    .withMessage('La capacidad debe ser un entero entre 2 y 7')
    .toInt(),
  body('precio_por_persona')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio por persona debe ser un número mayor o igual a 0')
    .toFloat(),
  body('descripcion').optional().isString().withMessage('La descripción debe ser texto'),
  body('estatus').optional().isIn(estadosValidos).withMessage('El estatus no es válido')
];

export const validarCambioEstadoHabitacion = [
  ...validarIdHabitacion,
  body('estado').isIn(estadosValidos).withMessage(`El estado debe ser uno de: ${estadosValidos.join(', ')}`)
];

export const responderErroresValidacion = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import path from "path";
import { fileURLToPath } from 'url';

import sequelize from './database/db.js';
import refreshTokenMiddleware from './middlewares/tokenrefresh.midd.js';
import { associateAllModels } from './models/index.js';
import { seedInitialData } from './seed.js';

// Configurar __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());
app.use(refreshTokenMiddleware);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    associateAllModels();
    await sequelize.sync({ force: false });
    console.log('Coneccion establecida correctamente.');
    await seedInitialData();
    console.log('Datos de la semilla creados.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
    throw error;
  }
};

app.get('/', (req, res) => {
  res.send('HollyU API running');
});
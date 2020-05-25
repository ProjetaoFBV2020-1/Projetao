import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

import uploadConfig from './config/upload';

const app = express();

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(express.json());

export default app;

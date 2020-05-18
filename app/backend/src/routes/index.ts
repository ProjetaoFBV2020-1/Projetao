import { Router, json } from 'express';

const routes = Router();
routes.use(json());

// define a rota e envia para o arquivo de escifico de rotas
export default routes;

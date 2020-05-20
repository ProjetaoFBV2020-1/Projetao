import { Router } from 'express';
import costumersRouter from './costumers.routes';
import ordersRouter from './orders.routes';
import companiesRouter from './companies.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/orders', ordersRouter);
routes.use('/costumers', costumersRouter);
// define a rota e envia para o arquivo de escifico de rotas
export default routes;

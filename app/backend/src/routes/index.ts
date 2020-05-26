import { Router } from 'express';
import costumersRouter from './customers.routes';
import ordersRouter from './orders.routes';
import companiesRouter from './companies.routes';
import itemsRouter from './items.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/orders', ordersRouter);
routes.use('/customers', costumersRouter);
routes.use('/items', itemsRouter);
routes.use('/sessions', sessionsRouter);
// define a rota e envia para o arquivo de escifico de rotas
export default routes;

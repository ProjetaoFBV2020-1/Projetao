import { Router } from 'express';
import costumersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import itemsRouter from '@modules/items/infra/http/routes/items.routes';
import sessionsCompanyRouter from '@modules/companies/infra/http/routes/sessionsCompany.routes';
import sessionsCustomerRouter from '@modules/customers/infra/http/routes/sessionsCustomer.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/orders', ordersRouter);
routes.use('/customers', costumersRouter);
routes.use('/items', itemsRouter);
routes.use('/sessionsCompany', sessionsCompanyRouter);
routes.use('/sessionsCustomer', sessionsCustomerRouter);
// define a rota e envia para o arquivo de escifico de rotas
export default routes;

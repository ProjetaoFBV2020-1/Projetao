import { Router } from 'express';

// Rotas de clientes
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';

// Rotas para pedidos
import ordersCustomerRouter from '@modules/orders/infra/http/routes/ordersCustomer.routes';
// import ordersCompanyRouter from '@modules/orders/infra/http/routes/ordersCompany.routes';

// Rota de items
import itemsRouter from '@modules/items/infra/http/routes/items.routes';

// Rotas de sessões
import sessionsCompanyRouter from '@modules/companies/infra/http/routes/sessionsCompany.routes';
import sessionsCustomerRouter from '@modules/customers/infra/http/routes/sessionsCustomer.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/customers', customersRouter);

routes.use('/orders', ordersCustomerRouter);
// routes.use('/orders', ordersCompanyRouter);

routes.use('/items', itemsRouter);

routes.use('/sessionsCompany', sessionsCompanyRouter);
routes.use('/sessionsCustomer', sessionsCustomerRouter);

// define a rota e envia para o arquivo de escifico de rotas

export default routes;

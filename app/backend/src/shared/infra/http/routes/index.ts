import { Router } from 'express';

// Rotas de clientes
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import addressCustomerRouter from '@modules/customers/infra/http/routes/addressCustomer.routes';

// Rotas para pedidos
import ordersCustomerRouter from '@modules/orders/infra/http/routes/ordersCustomer.routes';
import ordersCompanyRouter from '@modules/orders/infra/http/routes/ordersCompany.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

// Rota de items
import itemsRouter from '@modules/items/infra/http/routes/items.routes';

// Rotas de sessões
import sessionsCompanyRouter from '@modules/companies/infra/http/routes/sessionsCompany.routes';
import sessionsCustomerRouter from '@modules/customers/infra/http/routes/sessionsCustomer.routes';

import passwordCompanyRouter from '@modules/companies/infra/http/routes/passwordCompany.routes';
import passwordCustomerRouter from '@modules/customers/infra/http/routes/passwordCustomer.routes';

import profileCompanyRouter from '@modules/companies/infra/http/routes/profileCompany.routes';
import profileCustomerRouter from '@modules/customers/infra/http/routes/profileCustomer.routes';

import addressesCompanyRouter from '@modules/companies/infra/http/routes/addressesCompany.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/customers', customersRouter);

routes.use('/ordersCustomer', ordersCustomerRouter);
routes.use('/ordersCompany', ordersCompanyRouter);
routes.use('/orders', ordersRouter);

routes.use('/items', itemsRouter);

routes.use('/sessionsCompany', sessionsCompanyRouter);
routes.use('/passwordCompany', passwordCompanyRouter);
routes.use('/profileCompany', profileCompanyRouter);

routes.use('/sessionsCustomer', sessionsCustomerRouter);
routes.use('/passwordCustomer', passwordCustomerRouter);
routes.use('/profileCustomer', profileCustomerRouter);
routes.use('/addressCustomer', addressCustomerRouter);

routes.use('/addressCompany', addressesCompanyRouter);

export default routes;

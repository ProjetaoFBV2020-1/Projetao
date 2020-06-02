import { Router } from 'express';

import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';
// import Order_item from '../models/Order_item';

const ordersCompanyRouter = Router();

ordersCompanyRouter.use(ensureAuthenticated);

ordersCompanyRouter.get('/', async (request, response) => {
    return response.json({ ok: true });
});

ordersCompanyRouter.post('/');

export default ordersCompanyRouter;

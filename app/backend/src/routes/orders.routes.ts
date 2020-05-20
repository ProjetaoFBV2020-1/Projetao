import { Router } from 'express';
// import { parseISO } from 'date-fns';
// import { getCustomRepository } from 'typeorm';

// import AppointmentsRepository from '../Repositories/AppointmentsRepository';
// import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// import Order_item from '../models/Order_item';

const ordersRouter = Router();

ordersRouter.use(ensureAuthenticated);

ordersRouter.get('/', async (request, response) => {
    return response.json({ ok: true });
});

export default ordersRouter;

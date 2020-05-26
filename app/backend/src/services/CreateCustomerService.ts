import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Customer from '../models/Customer';
import AppError from '../errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
    date_birth: Date;
    phone: string;
}

class CreateCostumerService {
    public async execute({
        name,
        email,
        date_birth,
        password,
        phone,
    }: Request): Promise<Customer> {
        const costumersRepository = getRepository(Customer);

        const sameEmail = await costumersRepository.findOne({
            where: { email },
        });

        if (sameEmail) {
            throw new AppError('email already in use', 400);
        }

        const samePhone = await costumersRepository.findOne({
            where: { phone },
        });

        if (samePhone) {
            throw new AppError('phone already in use', 400);
        }

        const hashedPassword = await hash(password, 8);

        const costumer = costumersRepository.create({
            name,
            email,
            date_birth,
            password: hashedPassword,
            phone,
        });

        await costumersRepository.save(costumer);

        return costumer;
    }
}
export default CreateCostumerService;

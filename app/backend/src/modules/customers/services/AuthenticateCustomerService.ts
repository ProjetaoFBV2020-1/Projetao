import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    customer: Customer;
    token: string;
}

@injectable()
class AuthenticateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const customer = await this.customersRepository.findByEmail(email);

        if (!customer) {
            throw new AppError('Incorrect email/password combination', 401);
        }
        // customer.password - Senha criptografada
        // password - Senha enviada pelo usuario
        // compare do bcrypt compara uma senha criptografa com uma não e verifica se elas são iguais
        const passwordMatched = await compare(password, customer.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }
        // autenticado
        // nunca colocar senha ou dados sensiveis no token

        const token = sign({}, authConfig.jwt.secret, {
            subject: customer.id_customer,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            customer,
            token,
        };
    }
}
export default AuthenticateCustomerService;

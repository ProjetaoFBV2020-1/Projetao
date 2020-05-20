import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import Costumer from '../models/Customer';
import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
}
interface Response {
    costumer: Costumer;
    token: string;
}
class AuthenticateCostumerService {
    public async execute({ email, password }: Request): Promise<Response> {
        const costumersRepository = getRepository(Costumer);

        const costumer = await costumersRepository.findOne({
            where: { email },
        });

        if (!costumer) {
            throw new AppError('Incorrect email/password combination', 401);
        }
        // costumer.password - Senha criptografada
        // password - Senha enviada pelo usuario
        // compare do bcrypt compara uma senha criptografa com uma não e verifica se elas são iguais
        const passwordMatched = await compare(password, costumer.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }
        // autenticado
        // nunca colocar senha ou dados sensiveis no token

        const token = sign({}, authConfig.jwt.secret, {
            subject: costumer.id_customer,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            costumer,
            token,
        };
    }
}
export default AuthenticateCostumerService;

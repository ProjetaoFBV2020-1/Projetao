import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import Company from '../models/Company';
import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
}
interface Response {
    company: Company;
    token: string;
}
class AuthenticateCompanyService {
    public async execute({ email, password }: Request): Promise<Response> {
        const companiesRepository = getRepository(Company);

        const company = await companiesRepository.findOne({
            where: { email },
        });

        if (!company) {
            throw new AppError('Incorrect email/password combination', 401);
        }
        // company.password - Senha criptografada
        // password - Senha enviada pelo usuario
        // compare do bcrypt compara uma senha criptografa com uma não e verifica se elas são iguais
        const passwordMatched = await compare(password, company.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }
        // autenticado
        // nunca colocar senha ou dados sensiveis no token

        const token = sign({}, authConfig.jwt.secret, {
            subject: company.id_company,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            company,
            token,
        };
    }
}
export default AuthenticateCompanyService;
